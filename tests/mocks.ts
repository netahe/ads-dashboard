import { IAd } from "../src/types";
import { IAdEvent } from "ubimo-ad-dispatcher";
import { Chance } from "chance";

const chance = new Chance();

export const mock = <T>(props: () => T) => (patch?: Partial<T>): T => ({
  ...props(),
  ...patch
});

export const mockCoordinates = mock<{ x: number; y: number }>(() => ({
  x: chance.integer({ min: 0, max: 1280 }),
  y: chance.integer({ min: 0, max: 1887 })
}));

export const mockCreative = mock<{ name: string; url: string }>(() => ({
  name: chance.word(),
  url: chance.url()
}));

export const mockAdEvent = mock<IAdEvent>(() => ({
  type: chance.pickone(["IMAGE", "VIDEO"]),
  coordinates: mockCoordinates(),
  creative: mockCreative()
}));

export const mockAd = mock<IAd>(() => ({
  id: chance.guid(),
  age: chance.integer({ min: 0, max: 4 }),
  time: chance.date(),
  event: mockAdEvent(),
}));

export const mockAds = () =>
  new Array(chance.integer({ min: 1, max: 10 }))
    .fill(undefined)
    .map(_ => mockAd());

export const mockAdEvents = () =>
  new Array(chance.integer({ min: 1, max: 10 }))
    .fill(undefined)
    .map(_ => mockAdEvent());
