import React from "react";
import AdsLog from "./components/AdsLog/AdsLog";
import Map from "./components/Map/Map";
import { Provider } from "react-redux";
import { createAdsLoggerStore } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={createAdsLoggerStore()}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <AdsLog />
        <Map />
      </div>
    </Provider>
  );
};

export default App;
