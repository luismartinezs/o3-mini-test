import { serve } from "bun";
import { extname } from "path";

// Define the directory that contains our built files and index.html.
const PUBLIC_DIR = new URL("./public/", import.meta.url).pathname;

function getContentType(path: string): string {
  const extension = extname(path);
  switch (extension) {
    case ".html":
      return "text/html";
    case ".js":
      return "application/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    default:
      return "text/plain";
  }
}

console.log(`Serving static files from: ${PUBLIC_DIR}`);

const server = serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    // Default to index.html
    let pathname = url.pathname;
    if (pathname === "/") {
      pathname = "/index.html";
    }

    try {
      // Build up the full path to the file.
      const filePath = PUBLIC_DIR + pathname;
      const file = Bun.file(filePath);
      return new Response(file, {
        headers: { "Content-Type": getContentType(pathname) },
      });
    } catch (error) {
      return new Response("404 Not Found", { status: 404 });
    }
  },
});

console.log("Server running at http://localhost:3000");