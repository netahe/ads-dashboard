import * as React from "react";
import { mount } from "enzyme";
import AdsLog from "./AdsLog";
import { mockAdEvents } from "../../../tests/mocks";
import { AdDetails } from "./AdDetails";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createInitialState } from "../../store/state";

describe("<AdsLog />", () => {
  it("should list all ad events", () => {
    const adEvents = mockAdEvents();
    const initialState = createInitialState(adEvents);

    const wrapper = mount(
      <Provider store={createStore(() => initialState)}>
        <AdsLog />
      </Provider>
    );

    expect(wrapper.find(AdDetails).length).toEqual(adEvents.length);
  });
});
