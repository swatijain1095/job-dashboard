export  const getFormattedTime = (time: number) => {
    // dd/mm/yyyy time:AM/PM
    const dateObj = new Date(time);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const seconds = dateObj.getSeconds();
    const minutes = dateObj.getMinutes();

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