import express from "express";
import cors from "cors";
import env from "dotenv";
import fs from "fs";

import getTextFromPDF from "./src/getTextFromPDF.js";
// import GetSchedule from "./src/getSchedule.js";

env.config();
const app = express().use(cors());

const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || "192.168.0.195";

getTextFromPDF();

app.get("/api/v1/schedule", async (req, res) => {
  // const data = fs.readFileSync("./src/data/json/Lechebnoe delo-04-09-26.json");
  // const json = JSON.parse(data);
  // console.log(json);
  // res.json(json);
  // try {
  //   const { group, subgroup } = req.query;
  //   const data = await parserSchedule.parseData(
  //     "./src/data/pdf/Lechebnoe delo-04-09-26.pdf",
  //   );
  //   res.json({
  //     datas: `group - ${group}\nsubgroup - ${subgroup}\ndata - ${data}`,
  //   });
  // } catch (e) {
  //   console.error(e);
  //   res.status(500);
  // }
});

app.listen(PORT, HOST, () => {
  console.log(`server start on http://${HOST}:${PORT}`);
});
