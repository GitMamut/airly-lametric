"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
require("dotenv").config();
const app = express_1.default();
const port = 3000;
app.get("/", (req, res) => {
    var _a;
    node_fetch_1.default(getUrl(), {
        method: "GET",
        headers: {
            Accept: "application/json",
            apikey: (_a = process.env.API_KEY) !== null && _a !== void 0 ? _a : ""
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
    return ("https://airapi.airly.eu/v2/measurements/point?lat=" +
        process.env.LAT +
        "&lng=" +
        process.env.LNG);
}
function formatLM_Response(indexValue) {
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
