import * as cheerio from "cheerio";

export default class GetSchedule {
  constructor() {
    this.linkOchka =
      "https://www.surgu.ru/ucheba/raspisanie/ochnaya-forma-obucheniya";
  }

  async getSchedule() {
    try {
      const response = await fetch(this.linkOchka, { method: "GET" });
      if (response.ok) {
        const html = await response.text();

        const $ = cheerio.load(html);

        const files = [];
        $(".file").each((index, element) => {
          files.push({
            link: $(element).attr("link") || $(element).attr("href"),
            name: $(element).attr("name") || $(element).text().trim(),
          });
        });

        console.log("Найдено файлов:", files.length);
        console.log(files);

        return files;
      } else {
        console.error("error getSchedule!");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (e) {
      console.error("Ошибка:", e);
      throw e;
    }
  }

  // async downloadSchedule(file) {
  //   file.forEach(async (e) => {
  //       await
  //   })
  // }
}
