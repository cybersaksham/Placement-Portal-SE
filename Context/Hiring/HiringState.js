import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import useRequest from "../../Hooks/Request";
import ApplicationContext from "../Application/ApplicationContext";
import HiringContext from "./HiringContext";

const HiringState = (props) => {
  const HOST = "/api/hiring";

  const applicationFuncs = useContext(ApplicationContext);
  const [currentHiring, setCurrentHiring] = useState(null);
  const [hirings, setHirings] = useState([]);
  const checkRequest = useRequest();
  const router = useRouter();

  // Get Hiring by ID
  const getByID = async ({ id, type }) => {
    const response = await fetch(HOST + "/byId?hiringId=" + id + "&type=" + type, {
      method: "GET",
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      async () => {
        setCurrentHiring(json);
      }
    );
  };

  // Get Hires by Posting
  const getByPosting = async ({ postingId }) => {
    const response = await fetch(HOST + "/byPosting?postingId=" + postingId, {
      method: "GET",
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      async () => {
        setHirings(json);
      }
    );
  };

  // Get Hirings of Student
  const getByStudent = async ({ type }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/byStudent?type=" + type, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      async () => {
        setHirings(json);
      }
    );
  };

  // Accept application
  const accept = async ({ applicationId }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ applicationId }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "Hired the student: " + String(json.student.sid),
      async () => {
        applicationFuncs.getByPosting({ postingId: json.posting._id });
      }
    );
  };

  // Reject application
  const reject = async ({ applicationId }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ applicationId }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "Rejected the student: " + String(json.student.sid),
      async () => {
        applicationFuncs.getByPosting({ postingId: json.posting._id });
      }
    );
  };

  return (
    <HiringContext.Provider value={{
      getByID, getByPosting, getByStudent, accept, reject,
      currentHiring, hirings
    }}>
      {props.children}
    </HiringContext.Provider>
  );
};

export default HiringState;
