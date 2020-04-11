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

app.use("/", async (req, res) => {
  const fetchOptions = {
    headers: {
      Authorization:
        "Bearer sec_PPj60m3AT3crnWRM9ocQOqDy1QoYePUijNumOhlJR8PVmuyQ9pP3JOiDSHmDmf2NiqY7vK4zV8VI0r6C",
    },
  };
  const wakaURL = `https://wakatime.com/api/v1`;
  // noinspection JSValidateTypes
  const requests = [
    await fetch(`${wakaURL}/users/poplogics/stats/last_7_days`, fetchOptions)
      .then((res) => res.json())
      .then((data) => data),
    await fetch(
      `${wakaURL}/users/poplogics/summaries?start=${new Date(
        2020,
        4,
        6
      ).toUTCString()}&end=${new Date(2020, 4, 11).toUTCString()}`,
      fetchOptions
    )
      .then((res) => res.json())
      .then((data) => data),
    await fetch(`${wakaURL}/users/poplogics/projects`, fetchOptions)
      .then((res) => res.json())
      .then((data) => data),
  ];

  res.json(requests);
  console.log(requests);
  // Promise.all(requests).then(async (values) => {
  //   console.log(values);
  // });

  /*.then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.json(data);
    });*/
});

app.listen(3001, () => console.log("listening from port 3001"));
