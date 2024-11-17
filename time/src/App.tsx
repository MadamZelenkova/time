import "./App.css";
import React, { useState } from "react";
import moment from "moment";

function DateTime(props: { date: string }) {
  return <p className="date">{props.date}</p>;
}

function WithTimeAgo<T extends { date: string }>(
  Component: React.ComponentType<T>
) {
  return function (props: T) {
    const { date } = props;

    const now = moment();
    const videoDate = moment(date);
    const minutes = now.diff(videoDate, "minutes");
    const hours = now.diff(videoDate, "hours");
    const days = now.diff(videoDate, "days");

    let newTimeFormat = "";
    if (minutes < 60) {
      newTimeFormat = `${minutes} минут назад`;
    } else if (hours < 24) {
      newTimeFormat = `${hours} часов назад`;
    } else {
      newTimeFormat = `${days} дней назад`;
    }

    return <Component {...props} date={newTimeFormat} />;
  };
}

const NewTimeFormatComponent = WithTimeAgo(DateTime);

function Video(props: { url: string; date: string }) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <NewTimeFormatComponent date={props.date} />
    </div>
  );
}

function VideoList(props: { list: { url: string; date: string }[] }) {
  return props.list.map((item) => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-07-31 13:24:00",
    },
    {
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-03-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-02-03 23:16:00",
    },
    {
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-01 16:17:00",
    },
    {
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-12-02 05:24:00",
    },
  ]);

  return <VideoList list={list} />;
}
