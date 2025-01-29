import axios from "axios";
const cheerio = require("cheerio");

const url = "http://www.cnpc-amg.kz/?p=nov_list";

export async function getAllNews(setIsLoading, news_data, choosenYear) {
  try {
    setIsLoading(true);
    news_data.splice(0, news_data.length);
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);
    const news = $(
      "#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > ul > li"
    );

    news.each(function () {
      date = $(this).find("span.date").text();
      label = $(this).find("span.title i").text();
      title = $(this).find("span.title a").text();
      href = $(this).find("span.title a").attr("href");

      const year = date.split(".")[2];

      if (year === choosenYear || date === "") {
        news_data.push({ date, label, title, href });
      }
    });
    setIsLoading(false);
  } catch (error) {
    console.error(error);
  }
}
