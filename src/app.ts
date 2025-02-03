const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    // Serve index.html for the root path
    if (url.pathname === "/") {
      return new Response(Bun.file("index.html"));
    }

    // Serve static files; remove the leading slash to form the file path
    const filePath = url.pathname.slice(1);
    const file = Bun.file(filePath);
    return new Response(file);
  }
});

console.log(`Server running at http://localhost:${server.port}`);