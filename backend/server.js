const fetch = require("node-fetch");
const express = require("express");
const app = express();

// parse the post body string to json 'req.body'
app.use(express.json());

// mounting a router to the app
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", function (req, res) {
  console.log("fetch initiated");
  fetch(`https://wakatime.com/api/v1/users/poplogics/stats/last_7_days`, {
    headers: {
      Authorization:
        "Bearer sec_1xeh91EskwoCkwaZlPr04MyFqGuqevVRewJgQGGu0HoUZVUuxEMa6eV6SYCdmmtZ31UQgjKztjLKJrpS",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    });
});

app.listen(3001, () => console.log("listening from port 3001"));
