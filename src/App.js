import React, { useEffect } from "react";
import "./App.scss";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000").then((response) =>
      response.json().then((data) => {
        console.log(data);
        return data;
      })
    );
  });
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
