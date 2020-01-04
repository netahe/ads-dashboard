import * as React from "react";
import { connect } from "react-redux";
import { IAd } from "../../types";
import { AdDetails } from "./AdDetails";
import { createKey } from "../uniq-key";
import { AdsFilter } from "./AdsFilter/AdsFilter";
import {
  FILTER_BY_DATE,
  START_TIMESTAMP,
  END_TIMESTAMP
} from "../../store/actions";
import { AdsDashboardState } from "../../store/state";

interface AdsLogProps {
  ads: IAd[];
  start: number;
  end: number;
  applyFilter: (_: any) => any;
  setEndTime: (end: number) => any;
  setStartTime: (start: number) => any;
}
const AdsLog = ({
  ads,
  start,
  end,
  applyFilter,
  setEndTime,
  setStartTime
}: AdsLogProps) => (
  <div>
    <h1>Ads</h1>
    <AdsFilter
      start={start}
      end={end}
      applyFilter={applyFilter}
      setEndTime={setEndTime}
      setStartTime={setStartTime}
    />
    {ads.map(ad => (
      <AdDetails key={createKey(ad)} ad={ad} />
    ))}
  </div>
);

const mapStateToProps = ({ filtered, byId }: AdsDashboardState) => ({
  ads: filtered.ids.map(id => byId[id]),
  start: filtered.filter.start,
  end: filtered.filter.end
});

const mapDispatchToProps = (dispatch: Function) => ({
  applyFilter: () => dispatch({ type: FILTER_BY_DATE }),
  setStartTime: (start: number) => dispatch({ type: START_TIMESTAMP, start }),
  setEndTime: (end: number) => dispatch({ type: END_TIMESTAMP, end })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsLog);
