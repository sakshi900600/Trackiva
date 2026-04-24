import React, { useState } from "react";
import JobListView from "./job-list-view/JobListView";

const JobList = () => {
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  return (
    <JobListView
      view={view}
      setView={setView}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default JobList;