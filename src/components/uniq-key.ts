import { IAd } from "../types";

export const createKey = (ad: IAd): string =>
  `${ad.event.creative.name}-${ad.event.coordinates.x}-${ad.event.coordinates.y}`;