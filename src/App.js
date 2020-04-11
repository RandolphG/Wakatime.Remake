import React, { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [error, setError] = useState(false);
  const [stats, setStats] = useState({});

  /**
   *
   * @returns {Promise<void>}
   */
  async function fetchData() {
    // console.log("fetching data..");
    const url = "http://localhost:3001";
    const response = await fetch(url);
    response
      .json()
      .then((response) => {
        console.log(response[0].data, response[1].data, response[2].data);
        setStats(response[0].data);
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    // console.log("useEffect");
    fetchData();
  }, []);
  // noinspection JSUnresolvedVariable

  const {
    best_day,
    daily_average,
    daily_average_including_other_language,
    editors,
    end,
    timezone,
    username,
    human_readable_daily_average,
    human_readable_total,
    human_readable_daily_average_including_other_language,
    human_readable_total_including_other_language,
    languages,
    total_seconds_including_other_language,
    total_seconds,
  } = stats;

  // console.log(editors);

  return (
    <div className="app">
      <header className="app-main">
        <div className="left-side">
          <div className="userName">username : {username}</div>
          <div>timezone : {timezone}</div>
        </div>
        <div className="right-side">
          <div>daily average : {human_readable_daily_average}</div>
          <div>total : {human_readable_total}</div>
          <div>
            total : {human_readable_daily_average_including_other_language}
          </div>
          <div>
            {editors &&
              editors.map((editor, index) => (
                <div key={index}>editors {editor.name}</div>
              ))}
          </div>
          <div>
            grand total : {human_readable_total_including_other_language}
          </div>
          <div>total seconds : {total_seconds}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
