import fs from "fs";
import { PDFExtract } from "pdf.js-extract";

export default class ParserSchedule {
  constructor() {
    this.pdf = new PDFExtract();
    this.pages = [];
  }

  /**
   * @param {file} file - path to pdf
   */
  async parseData(file) {
    const buffer = fs.readFileSync(file);
    const data = await this.pdf.extractBufferAsync(buffer, {});

    this.pages = data.pages.map((page) => {
      const lines = PDFExtract.utils.pageToLines(page, 5);
      const row = PDFExtract.utils.extractTextRows(lines);

      return {
        content: page.content,
        lines: lines,
        row: row.map((e) => e.join("")),
      };
    });

    this.saveJson(this.pages[0].row);
    this.pages.forEach((e) => console.log(e));
    return this.pages;
  }

  /**
   * @param {data} data - Data to save
   */
  async saveJson(data) {
    fs.writeFileSync(
      "./src/data/json/Lechebnoe delo-04-09-26.json",
      JSON.stringify(data, null, 2),
      "utf-8",
    );
  }

  // /**
  //  * @param {pages} pages - all pages after includes from pdf
  //  */
  // parsungOnRules(pages) {}
}
