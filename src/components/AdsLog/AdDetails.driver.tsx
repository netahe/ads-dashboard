import * as React from "react";
import { ReactWrapper, mount } from "enzyme";
import { AdDetails, AdDetailsProps } from "./AdDetails";
import imageAd from '../../assets/image_ad.svg';

export class AdDetailsDriver {
  private wrapper: ReactWrapper;

  constructor(props: AdDetailsProps) {
    this.wrapper = mount(<AdDetails {...props} />, {
      attachTo: document.createElement("div")
    });
  }

  getType() {
    return this.wrapper.find('[data-test="type"]').props().src === imageAd ? 'IMAGE' : 'VIDEO';
  }

  getName() {
    return this.wrapper.find('[data-test="name"]').text();
  }

  getAsset() {
    return this.wrapper.find('[data-test="asset"]').props().href;
  }

  getTime() {
    return this.wrapper.find('[data-test="time"]').text();
  }

  getCoords() {
    return this.wrapper.find('[data-test="coords"]').text();
  }

  clean() {
    this.wrapper.detach();
  }
}
