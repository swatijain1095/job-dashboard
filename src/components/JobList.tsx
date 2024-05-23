import { useEffect, useState } from "react";
import JobItem from "./JobItem";

const JobList = () => {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [fullJobIdList, setFullJobIdList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchJobIds() {
    setIsLoading(true);
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/jobstories.json",
    );
    const jobs = await res.json();
    setFullJobIdList(jobs);
    setJobIds(jobs.slice(0, 6));
    setIsLoading(false);
  }

  useEffect(() => {
    fetchJobIds();
  }, []);

  const handleClick = () => {
    // show 6 more ids in the list
    // 2 copies - one will be full and one will be the main copy (will be always controlled)
    setJobIds(fullJobIdList.slice(0, jobIds.length + 6));
  };

  // [20] => () => [6] => () => [12] => () => [18]

  return (
    <div className="job-list">
      {isLoading ? (
        "Loading"
      ) : (
        <ul>
          {jobIds.map((jobId) => (
            <JobItem key={jobId} jobId={jobId} />
          ))}
        </ul>
      )}

      <button onClick={handleClick}>Load More</button>
    </div>
  );
};

export default JobList;
