import * as React from "react";
import style from "./Map.module.css";
import { Ad } from "./Ad";
import { connect } from "react-redux";
import { IAd } from "../../types";
import { createKey } from "../uniq-key";
import { AdsDashboardState } from "../../store/state";

export interface MapProps {
  ads: IAd[];
}

const Map = ({ ads }: MapProps) => {
  return (
    <div className={style.map}>
      {ads.map((ad: IAd) => (
        <Ad key={createKey(ad)} ad={ad.event} />
      ))}
    </div>
  );
};

const mapStateToProps = ({byId, all}: AdsDashboardState): MapProps => ({
  ads: all.ids.map(id => byId[id]).filter(({ age }) => age < 5)
});

export default connect(mapStateToProps)(Map);
