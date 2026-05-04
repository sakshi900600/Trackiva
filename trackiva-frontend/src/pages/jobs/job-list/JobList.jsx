import React, { useState } from "react";
import JobListView from "./job-list-view/JobListView";

const JobList = ({ refreshKey }) => {
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  return (
    <JobListView
      view={view}
      setView={setView}
      search={search}
      setSearch={setSearch}
      refreshKey={refreshKey}
    />
  );
};

export default JobList;