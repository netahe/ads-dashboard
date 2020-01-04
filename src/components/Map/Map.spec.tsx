import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Map from './Map';
import React from "react";
import { mockAds, mockAdEvent, mockAdEvents } from "../../../tests/mocks";
import { Ad } from "./Ad";
import { createInitialState } from "../../store/state";

describe('<Map />', () => {
    it('should display ads', () => {
        const ads = mockAdEvents();
        const initialState = createInitialState(ads);

        const wrapper = mount(<Provider store={createStore(() => initialState)}><Map /></Provider>);
        expect(wrapper.find(Ad).length).toEqual(ads.length);
    });
})