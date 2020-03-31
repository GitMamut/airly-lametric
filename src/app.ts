import express from "express";
import fetch from "node-fetch";
import { LM_response } from "./types";

require("dotenv").config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  fetch(getUrl(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      apikey: process.env.API_KEY ?? ""
    }
  })
    .then(res => res.json())
    .then(json => {
      res.send(formatLM_Response(json.current.indexes[0].value));
    })
    .catch(error => {
      console.error(error);
    });
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

function getUrl() {
  return (
    "https://airapi.airly.eu/v2/measurements/point?lat=" +
    process.env.LAT +
    "&lng=" +
    process.env.LNG
  );
}

function formatLM_Response(indexValue: string): LM_response {
  return {
    frames: [
      {
        text: "" + indexValue,
        icon: "i7066",
        index: 0
      }
    ]
  };
}
