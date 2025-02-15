export default async function (request) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing 'url' query parameter", { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Cookie": "ageConfirmed=true",
      },
      redirect: "follow", // Follow redirects
    });

    const responseBody = await response.text();
    return new Response(responseBody, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") || "text/plain" },
    });
  } catch (error) {
    return new Response(`Fetch Error: ${error.message}`, { status: 500 });
  }
}
