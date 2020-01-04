import { notImplemented } from "../../tests/utils";
import { filterReducer, adsReducer, filteredAdsReducer } from "./reducers";
import {
  setStartTimestamp,
  receiveAd,
  ageUpAds,
  applyFilter,
  setEndTimestamp
} from "./actions";
import { mockAdEvent, mockAd, mockAdEvents, mock } from "../../tests/mocks";
import { createInitialState } from "./state";

describe("Filter reducer", () => {
  it("should update filter with start timestamp", () => {
    const initialState = { start: -1, end: -1 };
    const timestamp = 1000;
    const reducedState = filterReducer(
      initialState,
      setStartTimestamp(timestamp)
    );

    expect(reducedState).toEqual({ start: timestamp, end: initialState.end });
  });
});

describe("Ads reducer", () => {
  it("should add new ad to the beginning of the list", () => {
    const initialState = createInitialState();

    const adEvent = mockAdEvent();

    const reducedState = adsReducer(initialState, receiveAd(adEvent));

    const id = reducedState.all.ids[0];
    const ad = reducedState.byId[id];

    expect(ad).toHaveProperty("age");
    expect(ad).toHaveProperty("time");
    expect(ad.event).toEqual(adEvent);
  });

  it("should age up all ads", () => {
    const ad = mockAd();
    const id = "1";
    const initialState = createInitialState();
    initialState.byId[id] = ad;

    const reducedState = adsReducer(initialState, ageUpAds());
    const reducedId = reducedState.byId[id];

    expect(reducedId.age).toEqual(ad.age + 1);
  });

  it("should update filtered ads list when filter is applied", () => {
    const start = 500;
    const end = 800;

    const initialState = createInitialState();

    const events = [
      receiveAd(mockAdEvent(), { time: new Date(600) }),
      receiveAd(mockAdEvent(), { time: new Date(1000) }),
      setStartTimestamp(start),
      setEndTimestamp(end),
      applyFilter()
    ];

    const reducedState = events.reduce(adsReducer, initialState);

    expect(reducedState.filtered.ids).toHaveLength(1);
  });

  it("should update filtered ads list when a new ad is added", () => {
    const start = 500;
    const end = 800;

    const initialState = createInitialState();

    const events = [
      setStartTimestamp(start),
      setEndTimestamp(end),
      receiveAd(mockAdEvent(), { time: new Date(600) }),
      receiveAd(mockAdEvent(), { time: new Date(1000) })
    ];

    const reducedState = events.reduce(adsReducer, initialState);
    
    expect(reducedState.filtered.ids).toHaveLength(1);
  });
});
