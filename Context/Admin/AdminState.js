import { useRouter } from "next/router";
import React, { useContext } from "react";
import useRequest from "../../Hooks/Request";
import AuthContext from "../Auth/AuthContext";
import AdminContext from "./AdminContext";

const AdminState = (props) => {
  const HOST = "/api/admin";

  const { getByID } = useContext(AuthContext);
  const checkRequest = useRequest();
  const router = useRouter();

  // Ban Student/Company
  const ban = async ({ id, type }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/ban", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id, type }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "User banned successfully",
      async () => {
        getByID({ userId: id });
      }
    );
  };

  // UnBan Student/Company
  const unban = async ({ id, type }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/unban", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id, type }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "User unbanned successfully",
      async () => {
        getByID({ userId: id });
      }
    );
  };

  return (
    <AdminContext.Provider value={{
      ban, unban
    }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
