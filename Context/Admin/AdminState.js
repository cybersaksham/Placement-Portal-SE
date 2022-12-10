import { useRouter } from "next/router";
import React from "react";
import useRequest from "../../Hooks/Request";
import AdminContext from "./AdminContext";

const AdminState = (props) => {
  const HOST = "/api/admin";

  const checkRequest = useRequest();
  const router = useRouter();

  // Ban Student/Company
  const ban = async ({ id, type }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/login");
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
      async () => { }
    );
  };

  // UnBan Student/Company
  const unban = async ({ id, type }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/login");
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
      async () => { }
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
