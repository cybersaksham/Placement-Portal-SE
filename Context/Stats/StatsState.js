import React, { useState } from "react";
import useRequest from "../../Hooks/Request";
import { postTypes } from "../../lib/frontendTypes";
import StatsContext from "./StatsContext";

const StatsState = (props) => {
  const HOST = "/api/stats";

  const [internStats, setInternStats] = useState([]);
  const [placementStats, setPlacementStats] = useState([]);
  const checkRequest = useRequest();

  // Get Stats
  const getStats = async ({ year, type }) => {
    const response = await fetch(HOST + "?year=" + year + "&type=" + type, {
      method: "GET",
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      async () => {
        if (type === postTypes.intern) setInternStats(json);
        else if (type === postTypes.job) setPlacementStats(json);
      }
    );
  };

  return (
    <StatsContext.Provider value={{
      getStats, internStats, placementStats
    }}>
      {props.children}
    </StatsContext.Provider>
  );
};

export default StatsState;
