import { notImplemented } from "../../../tests/utils";
import { mockAd, mockAdEvent, mockCreative } from "../../../tests/mocks";

import { AdDetailsDriver } from "./AdDetails.driver";
import { formatTime, formCoords } from "./AdDetails";

describe("<AdDetails />", () => {
  let driver: AdDetailsDriver;

  afterEach(() => driver.clean());

  it("should display ad name", () => {
    const name = "Expected Creative Name";
    const ad = mockAd();

    driver = new AdDetailsDriver({ ad });

    expect(driver.getName()).toEqual(ad.event.creative.name);
  });

  it("should show display time", () => {
    const ad = mockAd();
    const time = ad.time;

    driver = new AdDetailsDriver({ ad });

    expect(driver.getTime()).toEqual(formatTime(time));
  });

  it("should link to asset", () => {
    const ad = mockAd();

    driver = new AdDetailsDriver({ ad });

    expect(driver.getAsset()).toEqual(ad.event.creative.url);
  });

  it("should show video ad icon", () => {
    const videoAd = mockAd({ event: mockAdEvent({ type: "VIDEO" }) });

    driver = new AdDetailsDriver({ ad: videoAd });

    expect(driver.getType()).toEqual(videoAd.event.type);
  });

  it("should show image ad icon", () => {
    const imageAd = mockAd({ event: mockAdEvent({ type: "IMAGE" }) });

    driver = new AdDetailsDriver({ ad: imageAd });

    expect(driver.getType()).toEqual(imageAd.event.type);
  });

  it("should display coordinates", () => {
    const ad = mockAd();

    driver = new AdDetailsDriver({ ad });

    expect(driver.getCoords()).toEqual(formCoords(ad.event.coordinates));
  });
});
