import React, { useState } from "react";
import useRequest from "../../Hooks/Request";
import StatsContext from "./StatsContext";

const StatsState = (props) => {
  const HOST = "/api/stats";

  const [stats, setStats] = useState([]);
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
        setStats(json);
      }
    );
  };

  return (
    <StatsContext.Provider value={{
      getStats, stats
    }}>
      {props.children}
    </StatsContext.Provider>
  );
};

export default StatsState;
