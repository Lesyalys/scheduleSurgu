import fs from "fs";
import { formater } from "./rules/formater.js";
import { PDFExtract } from "pdf.js-extract";

export default class ParserSchedule {
  constructor() {
    this.pdf = new PDFExtract();
    this.pages = [];
    this.rules = formater;
  }

  /**
   * @param {file} file - path to pdf
   */
  async parseData(file) {
    const buffer = fs.readFileSync(file);
    const data = await this.pdf.extractBufferAsync(buffer, {}, (err, data) => {
      if (err) return console.error(err);
      return data;
    });

    // console.log(pages);
    this.pages = data.pages.map((e) => ({
      text: e.content
        .map((content) => content.str.trim())
        .filter((e) => e.length > 0),
    }));
    console.log(this.pages[15]);
    this.saveJson(this.pages);
    // this.pages.forEach((e) => console.log(e.text));
  }

  /**
   * @param {data} data - Data to save
   */
  async saveJson(data) {
    fs.writeFileSync(
      "./src/data/json/",
      JSON.stringify(data, null, 2),
      "utf-8",
    );
  }
}
