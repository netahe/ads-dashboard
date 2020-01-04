import * as React from "react";
import { AdsFilter } from "./AdsFilter";
import { mount } from "enzyme";

describe("<AdsFilter />", () => {
  it("should filter to a specific range", () => {
    const applyFilter = jest.fn();
    const setEndTime = jest.fn();
    const setStartTime = jest.fn();

    const wrapper = mount(
      <AdsFilter
        start={50}
        end={100}
        applyFilter={applyFilter}
        setEndTime={setEndTime}
        setStartTime={setStartTime}
      />
    );

    wrapper.find('[data-test="start-time"]').simulate('change');
    wrapper.find('[data-test="end-time"]').simulate('change');
    wrapper.find('[data-test="start-time"]').simulate('blur');

    expect(setStartTime).toHaveBeenCalledWith(50);
    expect(setEndTime).toHaveBeenCalledWith(100);
    expect(applyFilter).toHaveBeenCalled();
  });

  it('should not render a value of it is NaN', () => {
    const wrapper = mount(
      <AdsFilter
        start={NaN}
        end={NaN}
        applyFilter={jest.fn()}
        setEndTime={jest.fn()}
        setStartTime={jest.fn()}
      />
    );

    expect(wrapper.find('[data-test="start-time"]').props().value).toBe('');
    expect(wrapper.find('[data-test="end-time"]').props().value).toBe('');

    wrapper.find('[data-test="end-time"]').simulate('change');
  });

});
