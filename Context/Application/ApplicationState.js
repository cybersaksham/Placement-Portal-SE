import { useRouter } from "next/router";
import React, { useState } from "react";
import useRequest from "../../Hooks/Request";
import ApplicationContext from "./ApplicationContext";

const ApplicationState = (props) => {
  const HOST = "/api/application";

  const [currentApplication, setCurrentApplication] = useState(null);
  const [applications, setApplications] = useState([]);
  const checkRequest = useRequest();
  const router = useRouter();

  // Get Application by ID
  const getByID = async ({ id }) => {
    const response = await fetch(HOST + "/apply?applicationId=" + id, {
      method: "GET",
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      async () => {
        setCurrentApplication(json);
      }
    );
  };

  // Get Application by Posting
  const getByPosting = async ({ postingId }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/byPosting?postingId=" + postingId, {
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
        setApplications(json);
      }
    );
  };

  // Get Application by Student
  const getByStudent = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/byStudent", {
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
        setApplications(json);
      }
    );
  };

  // Apply to posting
  const apply = async ({ posting, resume }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ posting, resume }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "Applied to the posting id: " + String(posting),
      async () => {
        //TODO: go to application page
      }
    );
  };

  return (
    <ApplicationContext.Provider value={{
      getByID, getByPosting, getByStudent, apply,
      currentApplication, applications
    }}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationState;
