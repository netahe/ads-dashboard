import { IAdEvent } from "ubimo-ad-dispatcher";
import { IAd } from "../types";
import {Chance} from 'chance';


export const RECEIVE_AD = "receive_ad";
export const AGE_UP_ADS = "age_up_ads";
export const FILTER_BY_DATE = "filter_ads_by_date";
export const START_TIMESTAMP = "start_timestamp";
export const END_TIMESTAMP = "end_timestamp";

const chance = new Chance();

export interface ReceiveAdAction {
    type: typeof RECEIVE_AD,
    id: string,
    ad: IAd
}

export const receiveAd = (ad : IAdEvent, opts? : {id? : string, time? : Date}) : ReceiveAdAction => ({
    type: RECEIVE_AD,
    id: opts?.id ?? chance.guid(),
    ad : {event: ad, age : 0, time: opts?.time ?? new Date() }
}) 

interface AgeUpAdsActions {
    type: typeof AGE_UP_ADS
}

export const ageUpAds = () : AgeUpAdsActions => ({
  type: AGE_UP_ADS
});

export interface ApplyFilterAction {
    type: typeof FILTER_BY_DATE
}

export const applyFilter = () : ApplyFilterAction => ({
  type: FILTER_BY_DATE
});

export interface SetStartTimestampAction {
    type: typeof START_TIMESTAMP,
    start: number
}

export const setStartTimestamp = (start: number) : SetStartTimestampAction => ({
  type: START_TIMESTAMP,
  start
});

export interface SetEndTimestampAction {
    type: typeof END_TIMESTAMP,
    end: number
}

export const setEndTimestamp = (end: number) : SetEndTimestampAction => ({
  type: END_TIMESTAMP,
  end
});

export type AdsDashboardAction =
  | ReceiveAdAction
  | AgeUpAdsActions
  | ApplyFilterAction
  | SetStartTimestampAction
  | SetEndTimestampAction;
