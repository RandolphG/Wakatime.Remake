const fetch = require("node-fetch");
const express = require("express");
const app = express();

// parse the post body string to json 'req.body'
app.use(express.json());

// mounting a router to the app
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/", function(req, res) {
    fetch(`https://wakatime.com/api/v1/users/poplogics/goals`, {
        headers: {
            Authorization:
                "Bearer sec_dRB2WSJnqXefOE7PrC8DGzVkEvlLgP4qHVjTzzgLQehTSvqU3svwPi6vRIvG7K3FuC01dKhyYfWlwbeS",
        },
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            return res.json(data);
        });
});

app.listen(3001, () => console.log("listening from port 3001"));
