import { useEffect, useState } from "react";
import { getFormattedTime } from "../utils";

type JobItemProps = {
  jobId: number;
};
type JobDetails = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const JobItem = ({ jobId }: JobItemProps) => {
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { title = "", by = "", time = 0 } = jobDetails || {};
  // we want to perform fetch on mount
  const fetchJobDetails = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
    );
    const _jobDetails = (await res.json()) as JobDetails;
    console.log(_jobDetails);
    setJobDetails(_jobDetails);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <li>
      {" "}
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {" "}
          <h4>{title}</h4>
          <p>
            <span>{`by ${by}`}</span>
            <span>{getFormattedTime(time)}</span>
          </p>
        </>
      )}
    </li>
  );
};

export default JobItem;
