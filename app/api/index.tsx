import UploadCSV from "@/components/UploadCSV";
import WebScraper from "@/components/WebScraper";

export default function Home() {
  return (
    <div>
      <h1>Upload CSV</h1>
      <UploadCSV />
      <h1>Web Scraper</h1>
      <WebScraper />
    </div>
  );
}
