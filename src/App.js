import React, { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [error, setError] = useState(false);
  const [stats, setStats] = useState({});
  const [summary, setSummary] = useState({});
  const [project, setProject] = useState({});
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
        // console.log(response[0].data, response[1].data, response[2].data);
        setStats(response[0].data);
        setSummary(response[1].data);
        setProject(response[2].data);
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    // console.log("useEffect");
    fetchData();
  }, []);
  // noinspection JSUnresolvedVariable

  const {
    editors,
    timezone,
    username,
    human_readable_daily_average,
    human_readable_total,
    human_readable_daily_average_including_other_language,
    human_readable_total_including_other_language,
    languages,
    projects,
    total_seconds,
  } = stats;

  console.log(projects);

  return (
    <div className="app">
      <div className="app-main">
        <div className="left-side">
          <div className="userName">username : {username}</div>
          <div>timezone : {timezone}</div>
        </div>
        <div className="right-side">
          <div className="left">
            <div className="top">
              <div>daily average : {human_readable_daily_average}</div>
              <div>total : {human_readable_total}</div>
              <div>
                total : {human_readable_daily_average_including_other_language}
              </div>
              <div>
                grand total : {human_readable_total_including_other_language}
              </div>
              <div>total seconds : {total_seconds}</div>
            </div>
            <div className="bottom">
              <div className="projects">
                {projects &&
                  projects.map(
                    (
                      { minutes, name, percent, text, total_seconds },
                      index
                    ) => (
                      <div className="project-details" key={index}>
                        <div className="details-top">
                          <span>PROJECT {name.toUpperCase()} </span>
                        </div>
                        <div className="details-bottom">
                          <span>time {percent}%</span>
                          <span> {text}</span>
                        </div>
                      </div>
                    )
                  )}
              </div>
              <div className="ide-browsers">
                {editors &&
                  editors.map(({ name, percent, text }, index) => (
                    <div className="ide-browser" key={index}>
                      <div className="ide-browser-top">{name}</div>
                      <div className="ide-browser-bottom">
                        {percent}text{text}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="middle-side">
              <div className="languages">
                {languages &&
                  languages.map(
                    ({ name, total_seconds, text, percent }, index) => (
                      <div className="language" key={index}>
                        <div className="language-top">
                          {name} {percent}
                        </div>
                        <div className="language-bottom">{text}</div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
