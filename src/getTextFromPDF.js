import { PDFExtract } from "pdf.js-extract";
import fs from "fs";

export default function getTextFromPDF() {
  const parser = new PDFExtract();
  const buffer = fs.readFileSync("./src/data/pdf/Lechebnoe delo-04-09-26.pdf");

  parser.extractBuffer(buffer, {}, (err, data) => {
    if (err) return console.error(err);
    const pages = data.pages.map((page) => {
      return page.content
        .filter((item) => item.str && item.str.trim().length > 0)
        .map((item) => item.str)
        .join(" ");
    });
    console.log(pages);
    return pages;
  });
}
