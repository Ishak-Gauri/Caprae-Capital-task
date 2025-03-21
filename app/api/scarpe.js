import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $("title").text();

    res.status(200).json({ title });
  } catch (error) {
    res.status(500).json({ error: "Scraping failed" });
  }
}
