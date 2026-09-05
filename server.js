import express from "express";
import cors from "cors";
import env from "dotenv";

import ParserSchedule from "./src/scheduleParser.js";
// import GetSchedule from "./src/getSchedule.js";

env.config();
const app = express().use(cors());

const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || "192.168.0.195";

// const parserSchedule = new ParserSchedule().parseData();
const parserSchedule = new ParserSchedule();

app.get("/api/v1/schedule", async (req, res) => {
  try {
    const { group, subgroup } = req.query;
    const data = await parserSchedule.parseData(
      "./src/data/pdf/Lechebnoe delo-04-09-26.pdf",
    );
    res.json({
      datas: `group - ${group}\nsubgroup - ${subgroup}\ndata - ${data}`,
    });
  } catch (e) {
    console.error(e);
    res.status(500);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`server start on http://${HOST}:${PORT}`);
});
