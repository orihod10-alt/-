import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const videoId = path[0];

  // First, get the real video URL from Pexels API
  const apiResponse = await fetch(
    `https://api.pexels.com/videos/videos/${videoId}`,
    {
      headers: {
        "Authorization": "d6RkhRquk4YGi83S7Sy09FN71YoWFLCRX2NzNsdqOX5NFPY5GKpkjTma",
      },
    }
  );

  if (!apiResponse.ok) {
    return new NextResponse("video not found", { status: 404 });
  }

  const data = await apiResponse.json();

  // Get HD video file URL
  const videoFiles = data.video_files;
  const hdFile = videoFiles.find((f: { quality: string }) => f.quality === "hd")
    || videoFiles[0];

  const realUrl = hdFile.link;

  // Now proxy the actual video
  const range = request.headers.get("range");
  const headers: HeadersInit = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  };
  if (range) headers["Range"] = range;

  const upstream = await fetch(realUrl, { headers });

  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", upstream.headers.get("Content-Type") ?? "video/mp4");
  responseHeaders.set("Accept-Ranges", "bytes");
  responseHeaders.set("Cache-Control", "public, max-age=86400");

  const contentRange = upstream.headers.get("Content-Range");
  const contentLength = upstream.headers.get("Content-Length");
  if (contentRange) responseHeaders.set("Content-Range", contentRange);
  if (contentLength) responseHeaders.set("Content-Length", contentLength);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
