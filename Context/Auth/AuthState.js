import { useRouter } from "next/router";
import React, { useState } from "react";
import useRequest from "../../Hooks/Request";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const HOST = "/api/auth";

  const [currentUser, setCurrentUser] = useState(null);
  const checkRequest = useRequest();
  const router = useRouter();

  // Logging In
  const loginUser = async ({ email, password, type }) => {
    const response = await fetch(HOST + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: email, password, type }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "Logged in successfully",
      async () => {
        localStorage.setItem("token", JSON.stringify(json.authToken));
        router.push("/");
      }
    );
  };

  // Fetching
  const fetchUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/login");
      return;
    }
    const response = await fetch(HOST + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      }
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      () => {
        setCurrentUser(json);
      }
    );
  };

  // Get Company
  const getCompany = async ({ companyId }) => {
    const response = await fetch(HOST + "/company?companyId=" + companyId, {
      method: "GET"
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      () => { }
    );
  };

  // Registering Company
  const registerCompany = async ({ name, email, password, cPassword, type, headOffice }) => {
    if (password === cPassword) {
      const response = await fetch(HOST + "/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, type, headOffice }),
      });
      const json = await response.json();
      checkRequest(
        response.status,
        json.error + ": " + json.message,
        "Registered successfully",
        async () => {
          localStorage.setItem("token", JSON.stringify(json.authToken));
          router.push("/");
        }
      );
    } else {
      checkRequest(400, "Passwords do not match", null, () => { });
    }
  };

  // Get Student
  const getStudent = async ({ sid }) => {
    const response = await fetch(HOST + "/student?sid=" + sid, {
      method: "GET"
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      () => { }
    );
  };

  // Registering Student
  const registerStudent = async ({ name, sid, password, cPassword,
    degree, branch, graduationYear,
    dob, skills, cgpa
  }) => {
    if (password === cPassword) {
      const response = await fetch(HOST + "/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, sid, password,
          degree, branch, graduationYear,
          dob, skills, cgpa
        }),
      });
      const json = await response.json();
      checkRequest(
        response.status,
        json.error + ": " + json.message,
        "Registered successfully",
        async () => {
          localStorage.setItem("token", JSON.stringify(json.authToken));
          router.push("/");
        }
      );
    } else {
      checkRequest(400, "Passwords do not match", null, () => { });
    }
  };

  return (
    <AuthContext.Provider value={{
      loginUser, fetchUser,
      getCompany, registerCompany,
      getStudent, registerStudent,
      currentUser
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
