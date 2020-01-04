import { createStore } from "redux";
import { adDispatcher } from "ubimo-ad-dispatcher";
import {receiveAd, ageUpAds } from "./actions";
import { createInitialState } from "./state";
import { adsReducer } from "./reducers";

export const createAdsLoggerStore = () => {
  const store = createStore(adsReducer, createInitialState());

  adDispatcher.registerToAdEvents(ad =>
    store.dispatch(receiveAd(ad))
  );
  setInterval(() => store.dispatch(ageUpAds()), 1000);

  return store;
};
