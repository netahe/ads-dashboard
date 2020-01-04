import * as React from "react";

interface AdsFilterProps {
  start: number;
  end: number;
  applyFilter: (_: any) => any;
  setStartTime: (start: number) => any;
  setEndTime: (end: number) => any;
}
export const AdsFilter = ({
  start,
  end,
  applyFilter,
  setStartTime,
  setEndTime
}: AdsFilterProps) => (
  <>
    <input
      data-test="start-time"
      value={isNaN(start)? '' : start}
      onBlur={applyFilter}
      onChange={({ target: { value } }) => setStartTime(value === ''? NaN : parseInt(value))}
      placeholder="Filter start"
    ></input>
    <input
      data-test="end-time"
      value={isNaN(end) ? '' : end}
      onBlur={applyFilter}
      onChange={({ target: { value } }) => setEndTime(value === ''? NaN : parseInt(value))}
      placeholder="Filter end"
    ></input>
  </>
);
