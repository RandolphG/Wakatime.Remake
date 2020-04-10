import React, { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [error, setError] = useState(false);
  const [stats, setStats] = useState([]);

  /**
   *
   * @returns {Promise<void>}
   */
  async function fetchData() {
    console.log("fetching data..");
    const url = "http://localhost:3001";
    const response = await fetch(url);
    response
      .json()
      .then((data) => {
        console.log(data, typeof data);
        setStats(Object.values(data));
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    console.log("useEffect");
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {!error && (
          <div>
            {Object.values(stats).map((item, index) => (
              <p key={index}>
                {index}
                {}
              </p>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
