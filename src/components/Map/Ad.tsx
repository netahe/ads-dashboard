import * as React from "react";
import { IAdEvent } from "ubimo-ad-dispatcher";
import style from "./Map.module.css";

export const Ad = ({
  ad: { coordinates, creative, type }
}: {
  ad: IAdEvent;
}) => {

  return (
    <div
      className={style.ad}
      style={{
        top: coordinates.y,
        left: coordinates.x,
        position: "absolute"
      }}
    >
      {type === "IMAGE" ? (
        <img src={creative.url} />
      ) : (
        <video autoPlay muted src={creative.url} />
      )}
    </div>
  );
};
