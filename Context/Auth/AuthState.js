import { useRouter } from "next/router";
import React, { useState } from "react";
import useRequest from "../../Hooks/Request";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const HOST = "/api/auth";

  const [currentUser, setCurrentUser] = useState(null);
  const [fetchedUser, setFetchedUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [student, setStudent] = useState(null);
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
        fetchUser();
        router.push("/");
      }
    );
  };

  // Logging Out
  const logoutUser = async () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    checkRequest(
      200,
      null,
      "Logged out successfully",
      async () => {
        router.push("/auth/login");
      }
    );
  };

  // Fetching
  const fetchUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      setCurrentUser(null);
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
      },
      () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        router.push("/auth/login");
      }
    );
  };

  // Get By ID
  const getByID = async ({ userId }) => {
    const response = await fetch(HOST + "/user?userId=" + userId, {
      method: "GET"
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      () => {
        setFetchedUser(json);
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
      () => {
        setCompany(json);
      }
    );
  };

  // Get All Companies
  const getAllCompanies = async () => {
    const response = await fetch(HOST + "/allCompanies", {
      method: "GET"
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      () => {
        setCompanies(json);
      }
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
          fetchUser();
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
      () => {
        setStudent(json);
      }
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
          fetchUser();
          router.push("/");
        }
      );
    } else {
      checkRequest(400, "Passwords do not match", null, () => { });
    }
  };

  return (
    <AuthContext.Provider value={{
      loginUser, logoutUser, fetchUser, getByID,
      getCompany, getAllCompanies, registerCompany,
      getStudent, registerStudent,
      currentUser, fetchedUser, company, companies, student
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
