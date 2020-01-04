import * as React from "react";
import { IAd } from "../../types";
import linkIcon from "../../assets/link.svg";
import videoAd from "../../assets/movie_ad.svg";
import imageAd from "../../assets/image_ad.svg";

export interface AdDetailsProps {
  ad: IAd;
}

export const formatTime = (time: Date) =>
  `${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;

export const formCoords = ({ x, y }: { x: number; y: number }) =>
  `(${x}, ${y})`;

export const AdDetails = ({ ad: { time, event } }: AdDetailsProps) => (
  <div>
    <span data-test="coords">{formCoords(event.coordinates)}</span>
    <span data-test="time">{formatTime(time)}</span>
    <img data-test="type" src={event.type === "IMAGE" ? imageAd : videoAd} />
    <span data-test="name">{event.creative.name}</span>
    <a data-test="asset" href={event.creative.url}>
      <img src={linkIcon} />
    </a>
  </div>
);
