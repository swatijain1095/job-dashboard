import { useEffect, useState } from "react";

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

  const getFormattedTime = () => {
    // dd/mm/yyyy time:AM/PM
    const dateObj = new Date(time);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const seconds = dateObj.getSeconds();
    const minutes = dateObj.getMinutes();

    console.log({
      day,
      month,
      year,
      hours,
      minutes,
      seconds,
    });
    let rest;
    if (hours < 12) {
      rest = "AM";
    } else if (hours > 12) {
      rest = "PM";
    }
    let hourss = hours % 12;

    const timeDisplay = `${day}-${month}-${year}, ${
      hourss || 12
    }:${minutes}:${seconds} ${rest}`;

    return timeDisplay;
  };
  useEffect(() => {
    fetchJobDetails();
  }, []);
  //
  return isLoading ? (
    <span>Loading</span>
  ) : (
    <li>
      <h4>{title}</h4>
      <p>
        <span>{`by ${by}`}</span>
        <span>{getFormattedTime()}</span>
      </p>
    </li>
  );
};

export default JobItem;
