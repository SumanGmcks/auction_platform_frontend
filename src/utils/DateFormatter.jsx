import React from "react";
import dayjs from "dayjs";

export const DateFormatter = ({ date }) => {
  return <>{dayjs(date).format("D MMM YYYY")}</>;
};

/* import React from "react";

export const DateFormatter = ({ date }) => {
  const apiDateString = date;
  const dateObject = new Date(apiDateString);
  const readableDate = dateObject.toLocaleString();

  return <>{readableDate}</>;
};
 */
