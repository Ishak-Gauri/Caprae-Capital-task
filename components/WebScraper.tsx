import { useState } from "react";

const WebScraper = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleScrape = async () => {
    const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    setTitle(data.title || "No title found");
  };

  return (
    <div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
      <button onClick={handleScrape}>Scrape</button>
      {title && <p>Title: {title}</p>}
    </div>
  );
};

export default WebScraper;
