import * as React from 'react';
import { notImplemented } from "../../../tests/utils";
import { mockAd, mockAdEvent } from "../../../tests/mocks";
import { mount, ReactWrapper } from "enzyme";
import { Ad } from "./Ad";

describe('<Ad />', () => {
    it('should display ad at location', () => {
        const ad = mockAdEvent();
        const wrapper : ReactWrapper = mount(<Ad ad={ad} />);
        const position = wrapper.find('div').props().style ?? {}; 

        expect(position.top).toEqual(ad.coordinates.y);
        expect(position.left).toEqual(ad.coordinates.x);

    });

    it('should autoplay video ad muted', () => {
        const ad = mockAdEvent({type : 'VIDEO'});
        const wrapper : ReactWrapper = mount(<Ad ad={ad} />);
        const video = wrapper.find('video').props()

        expect(video.autoPlay).toBe(true);
        expect(video.muted).toBe(true);
    });
});