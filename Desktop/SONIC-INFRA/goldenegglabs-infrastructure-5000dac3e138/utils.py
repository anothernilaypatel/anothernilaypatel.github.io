from zoneinfo import ZoneInfo
import datetime
import requests

def datestr2opt(edate, strike, callPut, useSPX=False):
    dtd = datetime.datetime.strptime(edate, "%m/%d/%Y")
    blah = "O:SPY"
    if useSPX:
        blah = "O:SPXW"
    option = blah+dtd.strftime("%y%m%d")+callPut+str(strike).zfill(5)+"000"
    return option

def getTimestamp(date_str, hour, minute):
    naive_dt = datetime.datetime.strptime(date_str, "%m/%d/%Y")
    naive_dt = naive_dt.replace(hour=hour, minute=minute, second=0, microsecond=0)
    tz = ZoneInfo("America/New_York")
    aware_dt = naive_dt.replace(tzinfo=tz)
    return int(aware_dt.timestamp())

def clockTime(ts):
    return datetime.datetime.fromtimestamp(ts, tz=ZoneInfo("America/New_York")).strftime("%H:%M")



def otmByTimeleft(secondsLeft):
    hoursLeft = (secondsLeft)/3600
    if hoursLeft < 1:
        return -1
    elif hoursLeft < 2:
        return 0
    elif hoursLeft < 4:
        return 1
    return 2

def exitAfterTime(params):
    waitN = 300
    if "seconds" in params:
        waitN = params["seconds"]
    elif "minutes" in params:
        waitN = params["minutes"]*60
    elif "hours" in params:
        waitN = params["hours"]*3600
    def exitCallback(theContract, dataObj):
        willExit = dataObj.ts >= (theContract.start + waitN)
        timestamp = dataObj.ts
        try:
            if willExit and ("logFunc" in params):
                (params["logFunc"])(theContract, timestamp)
        except:
            print("your logger broke when exiting",theContract, timestamp)
        return willExit
    return exitCallback

def threeStage(params):
    def initParams(theContract, dataObj):
        theContract.stage = "stage1"
        theContract.trail = params["trail0"]
        theContract.maxProf = 0.0
        theContract.optCut = -0.1
        theContract.maxU = dataObj.fetchPrice(theContract.underlying)
        theContract.dirMul = 1 if (theContract.cOrP == "C") else -1
        theContract.stopLoss = theContract.maxU - (theContract.dirMul*theContract.trail)
        theContract.p1 = params["profit1"]
        theContract.p2 = params["profit2"]
        theContract.trail2 = params["trail1"]
        theContract.optSL = params["optSL"]
    def exitCallback(theContract, dataObj):
        if not hasattr(theContract, "stage"):
            initParams(theContract, dataObj)

        nowU = dataObj.fetchPrice(theContract.underlying)
        if theContract.ret > theContract.maxProf:
            theContract.maxProf = theContract.ret
            theContract.optCut = theContract.ret - theContract.optSL
            if theContract.ret > theContract.p1 and theContract.stage == "stage1":
                theContract.stage = "stage2"
                theContract.trail = theContract.trail2
                theContract.stopLoss = theContract.maxU - (theContract.dirMul*theContract.trail)
            if theContract.ret > theContract.p2 and theContract.stage == "stage2":
                theContract.stage = "stage3"
                theContract.trail = 0.1
                theContract.stopLoss = theContract.maxU - (theContract.dirMul*theContract.trail)
            print("new maxProf", theContract.maxProf)
        willExit = False
        if (theContract.stage < "stage3") and (theContract.cOrP == "C") and (nowU <= theContract.stopLoss):
            willExit = True
            print("stop loss for CALL", theContract.ret)
        if (theContract.stage < "stage3") and (theContract.cOrP == "P") and (nowU >= theContract.stopLoss):
            willExit = True
            print("stop loss for PUT", theContract.ret)
        if (theContract.stage == "stage3") and (theContract.ret <= theContract.optCut):
            willExit = True
            print("stop loss by options in stage3")
        if (theContract.cOrP == "C") and (nowU > theContract.maxU) and (theContract.stage < "stage3"):
            theContract.maxU = nowU
            theContract.stopLoss = theContract.maxU - (theContract.dirMul*theContract.trail)
            print("new max underlying", nowU)
        if (theContract.cOrP == "P") and (nowU < theContract.maxU) and (theContract.stage < "stage3"):
            theContract.maxU = nowU
            theContract.stopLoss = theContract.maxU - (theContract.dirMul*theContract.trail)
            print("new min underlying", nowU)

        try:
            if willExit and ("logFunc" in params):
                (params["logFunc"])(theContract, dataObj.ts)
        except:
            print("your logger broke when exiting",theContract, dataObj.ts)
        return willExit
    return exitCallback

import pandas as pd
import pytz
#import datetime
from polygon import RESTClient
from typing import Dict

# ====================== GLOBAL STATE ======================
_client = None
_ny_tz = pytz.timezone('America/New_York')

# Configuration
SYMBOL = 'SPY'
API_KEY = 'FC84VoUMTnDAlAg67RggyjLG8pAyWwX4'  # ← Replace
FAST_EMA = 9
SLOW_EMA = 21
TREND_EMA = 200
# =========================================================

_client = RESTClient(API_KEY)

def makePolyDate(datestr):
    dto = datetime.datetime.strptime(datestr, "%m/%d/%Y")
    return dto.strftime("%Y-%m-%d")

def load_date_candles(symbol, input_date, scale):
    """Load minute bars for target_date. Cache permanently only if it's a past day."""
    current_ny_date = datetime.datetime.now(_ny_tz).date()
    target_date = makePolyDate(input_date)

    mult = 1
    span = "minute"
    if scale == "1s":
        mult = 1
        span = "second"
    if scale == "5m":
        mult = 5
        span = "minute"


    #try:
    aggs = _client.get_aggs(
        ticker=symbol,
        multiplier=mult,
        timespan=span,
        from_=str(target_date),
        to=str(target_date),  # Same day → gets all available minutes up to now
        limit=50000
    )

    print("hi")
    if not aggs:
        print(f"No data returned for {target_date}")
        return

    rows = []
    indexes = []
    for bar in aggs:
        ts_utc = pd.to_datetime(bar.timestamp, unit='ms', utc=True)
        ts_ny = ts_utc.tz_convert(_ny_tz).floor('min')
        rows.append({
            't': bar.timestamp,
            'o': bar.open,
            'h': bar.high,
            'l': bar.low,
            'c': bar.close,
            'v': bar.volume,
            's':'p'
        })
        indexes.append(ts_ny)

    df = pd.DataFrame(rows)
    df.set_index('t', inplace=True)
    df = df.sort_index()
    return df
    #except Exception as e:
    #    print(f"Error loading {target_date}: {e}")


apiresults=[]

def nextBatch(tmpurl):
    global apiresults
    apikey = f"&apiKey={API_KEY}"
    resp = requests.get(tmpurl + apikey)
    batch = resp.json()
    if batch['status'] == "ERROR":
        print(batch)
    apiresults += batch['results']
    return batch['next_url'], batch

def getTradingDays(sdate, edate):
    global apiresults
    dtd = datetime.datetime.strptime(sdate, "%m/%d/%Y")
    pricesdate = dtd.strftime("%Y-%m-%d")
    dtde = datetime.datetime.strptime(edate, "%m/%d/%Y")
    priceedate = dtde.strftime("%Y-%m-%d")
    starturl = "https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/%s/%s?adjusted=true&sort=asc" % (pricesdate, priceedate)
    tmpurl = starturl
    apiresults = []
    for loop in range(1000):
        try:
            tmpurl, batch = nextBatch(tmpurl)
        except:
            print("done")
            break
    output = {}
    kys = []
    for cand in apiresults:
        ky = datetime.datetime.fromtimestamp(cand['t']//1000).strftime("%m/%d/%Y")
        output[ky] = cand
        kys.append(ky)
    return kys

