import React, { useEffect, useState } from "react";
import "./App.css";
import { Avatar, Badge } from "antd";
import "antd/dist/antd.css";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

function App() {
  const [error, setError] = useState(false);
  const [stats, setStats] = useState({});
  const [summary, setSummary] = useState({});
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
        setStats(response[0].data);
        setSummary(response[1].data);
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    fetchData();
  }, []);
  // noinspection JSUnresolvedVariable

  const {
    editors,
    timezone,
    username,
    human_readable_daily_average,
    human_readable_total,
    human_readable_total_including_other_language,
    languages,
    projects,
  } = stats;

  console.log(projects);

  return (
    <div className="app">
      <div className="app-main">
        <div className="left-side">
          <div className="userName">
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
            {username}
          </div>
          <div>{timezone}</div>
        </div>
        <div className="right-side">
          <div className="left">
            <div className="top">
              <div>DAILY AVG : {human_readable_daily_average}</div>
              <div>LOGGED HRS : {human_readable_total}</div>
              <div>
                TOTAL HRS : {human_readable_total_including_other_language}
              </div>
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
                        <Collapse accordion>
                          <Panel
                            className={"site-collapse-custom-panel"}
                            header={name.toUpperCase()}
                            key="1"
                          >
                            <p>{text}</p>
                          </Panel>
                        </Collapse>
                      </div>
                    )
                  )}
              </div>
              <div className="ide-browsers">
                {editors &&
                  editors.map(({ name, percent, text }, index) => (
                    <div className="ide-browser" key={index}>
                      <div className="ide-browser-top">
                        {name.toUpperCase()}
                      </div>
                      <div className="ide-browser-bottom">
                        {percent}% {text}
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
                          <Badge count={`${name.toUpperCase()} ${percent}%`} />
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
