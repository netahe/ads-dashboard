import {
  AdsDashboardAction,
  START_TIMESTAMP,
  END_TIMESTAMP,
  RECEIVE_AD,
  AGE_UP_ADS,
  FILTER_BY_DATE
} from "./actions";
import {
  FilteredAdsState,
  AdsDashboardState,
  AdsFilter,
  AllAdsState,
  createInitialState
} from "./state";
import { IAd } from "../types";
import { Reducer } from "redux";

const isAdInRange = (ad: IAd, start: number, end: number) =>
  ad.time >= new Date(start) && ad.time <= new Date(end);

export const filterReducer = (
  filter: AdsFilter = { start: -1, end: -1 },
  action: AdsDashboardAction
) => {
  switch (action.type) {
    case START_TIMESTAMP:
      return { ...filter, start: action.start };
    case END_TIMESTAMP:
      return { ...filter, end: action.end };
    default:
      return filter;
  }
};

export const filteredAdsReducer = (
  { ids, filter }: FilteredAdsState,
  action: AdsDashboardAction
): FilteredAdsState => {
  switch (action.type) {
    case RECEIVE_AD:
      return {
        ids:
          isNaN(filter.start) ||
          isNaN(filter.end) ||
          isAdInRange(action.ad, filter.start, filter.end)
            ? [action.id].concat(ids)
            : ids,
        filter
      };
    default:
      return { ids, filter: filterReducer(filter, action) };
  }
};

export const allReducer = (
  { ids }: AllAdsState,
  action: AdsDashboardAction
): AllAdsState => {
  switch (action.type) {
    case RECEIVE_AD:
      return { ids: [action.id].concat(ids) };
    default:
      return { ids };
  }
};

export const adsReducer: Reducer<AdsDashboardState, AdsDashboardAction> = (
  { byId, all, filtered }: AdsDashboardState = createInitialState(),
  action: AdsDashboardAction
) => {
  switch (action.type) {
    case RECEIVE_AD:
      return {
        byId: { ...byId, [action.id]: { ...action.ad } },
        all: allReducer(all, action),
        filtered: filteredAdsReducer(filtered, action)
      };

    case AGE_UP_ADS:
      return {
        byId: Object.fromEntries(
          Object.entries(byId).map(([id, ad]) => [
            id,
            { ...ad, age: ad.age + 1 }
          ])
        ),
        all,
        filtered
      };

    case FILTER_BY_DATE:
      return {
        byId,
        all,
        filtered: {
          ids: Object.entries(byId)
            .filter(([_, ad]) =>
              isAdInRange(ad, filtered.filter.start, filtered.filter.end)
            )
            .map(([id, _]) => id),
          filter: filtered.filter
        }
      };

    default:
      return {
        byId,
        all: allReducer(all, action),
        filtered: filteredAdsReducer(filtered, action)
      };
  }
};
