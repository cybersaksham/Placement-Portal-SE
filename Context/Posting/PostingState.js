import { useRouter } from "next/router";
import React, { useState } from "react";
import useRequest from "../../Hooks/Request";
import PostingContext from "./PostingContext";

const PostingState = (props) => {
  const HOST = "/api/posting";

  const [currentPosting, setCurrentPosting] = useState(null);
  const [postings, setPostings] = useState(null);
  const checkRequest = useRequest();
  const router = useRouter();

  // Get All Postings
  const getAll = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/allPosting", {
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
        setPostings(json);
      }
    );
  };

  // Get By Company
  const getByCompany = async ({ id }) => {
    const response = await fetch(HOST + "/byCompany?companyId=" + id, {
      method: "GET",
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      async () => {
        setPostings(json);
      }
    );
  };

  // Close Posting
  const closePosting = async ({ postingId }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/closePost?postingId=" + postingId, {
      method: "PUT",
      headers: {
        "auth-token": token,
      },
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "Closed the posting: " + String(postingId),
      async () => {
        for (let index = 0; index < postings.interns.length; index++) {
          const element = postings.interns[index];
          if (element._id === postingId) {
            let newData = postings;
            newData.interns[index].isClosed = true;
            setPostings(newData);
          }
        }
        for (let index = 0; index < postings.jobs.length; index++) {
          const element = postings.jobs[index];
          if (element._id === postingId) {
            let newData = postings;
            newData.jobs[index].isClosed = true;
            setPostings(newData);
          }
        }
        setCurrentPosting(json);
      }
    );
  };

  // Get Intern
  const getIntern = async ({ internId }) => {
    const response = await fetch(HOST + "/internPost?internId=" + internId, {
      method: "GET",
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      async () => {
        setCurrentPosting(json);
      }
    );
  };

  // Post Intern
  const postIntern = async ({ role, branches,
    minCGPA, location, graduationYear, joiningDate,
    stipend, duration }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/internPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({
        role, branches,
        minCGPA, location, graduationYear, joiningDate,
        stipend, duration
      }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "Intern posting created",
      async () => {
        setCurrentPosting(json);
        router.push("/posting");
      }
    );
  };

  // Get Job
  const getJob = async ({ jobId }) => {
    const response = await fetch(HOST + "/jobPost?jobId=" + jobId, {
      method: "GET",
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      null,
      async () => {
        setCurrentPosting(json);
      }
    );
  };

  // Post Job
  const postJob = async ({ role, branches,
    minCGPA, location, graduationYear, joiningDate,
    ctc, shares }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const response = await fetch(HOST + "/jobPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({
        role, branches,
        minCGPA, location, graduationYear, joiningDate,
        ctc, shares
      }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error + ": " + json.message,
      "Job posting created",
      async () => {
        setCurrentPosting(json);
        router.push("/posting");
      }
    );
  };

  return (
    <PostingContext.Provider value={{
      getAll, getByCompany, closePosting,
      getIntern, postIntern, getJob, postJob,
      currentPosting, postings
    }}>
      {props.children}
    </PostingContext.Provider>
  );
};

export default PostingState;
