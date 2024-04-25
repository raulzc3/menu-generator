export default function DownloadJSON({ title, data }) {
  const dataStr =
    "data:application/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(data));
  const download = document.createElement("a");
  download.setAttribute("href", dataStr);
  download.setAttribute("download", title + ".json");
  document.body.appendChild(download);
  download.click();
  download.remove();
}
