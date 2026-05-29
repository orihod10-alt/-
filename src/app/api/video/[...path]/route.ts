import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const videoPath = path.join("/");
  const pexelsUrl = `https://videos.pexels.com/video-files/${videoPath}`;

  const range = request.headers.get("range");

  const upstreamHeaders: HeadersInit = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "video/mp4,video/*;q=0.9,*/*;q=0.8",
  };

  if (range) {
    upstreamHeaders["Range"] = range;
  }

  let upstream: Response;
  try {
    upstream = await fetch(pexelsUrl, { headers: upstreamHeaders });
  } catch {
    return new NextResponse("upstream fetch failed", { status: 502 });
  }

  const responseHeaders = new Headers();
  responseHeaders.set(
    "Content-Type",
    upstream.headers.get("Content-Type") ?? "video/mp4"
  );
  responseHeaders.set("Accept-Ranges", "bytes");
  responseHeaders.set("Cache-Control", "public, max-age=86400");

  const contentRange  = upstream.headers.get("Content-Range");
  const contentLength = upstream.headers.get("Content-Length");
  if (contentRange)  responseHeaders.set("Content-Range",  contentRange);
  if (contentLength) responseHeaders.set("Content-Length", contentLength);

  return new NextResponse(upstream.body, {
    status:  upstream.status,
    headers: responseHeaders,
  });
}
