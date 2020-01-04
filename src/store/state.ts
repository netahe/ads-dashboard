import { IAd } from "../types";
import { IAdEvent } from "ubimo-ad-dispatcher";
import { adsReducer } from "./reducers";
import { receiveAd } from "./actions";

export type AdsFilter = {
  start: number;
  end: number;
};

export type AllAdsState = {
  ids: string[];
};

export type FilteredAdsState = {
  ids: string[];
  filter: AdsFilter;
};

export interface AdsDashboardState {
  byId: { [key: string]: IAd };
  all: AllAdsState;
  filtered: FilteredAdsState;
}

export const createInitialState = (events?: IAdEvent[]): AdsDashboardState => {
  const initialState: AdsDashboardState = {
    byId: {},
    all: { ids: [] },
    filtered: { ids: [], filter: { start: NaN, end: NaN } }
  };

  let state = initialState;

  if (events) {
    state = events
      .map(event => receiveAd(event))
      .reduce(adsReducer, initialState);
  }

  return state;
};
