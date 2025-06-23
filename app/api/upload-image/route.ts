import { NextRequest, NextResponse } from "next/server";

const IMGUR_CLIENT_ID = "83720724ffa61d9"; // your actual Client ID

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("image");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No image file provided" }, { status: 400 });
  }

  // Prepare form data for Imgur
  const imgurForm = new FormData();
  imgurForm.append("image", file, (file as File).name || "upload.jpg");

  try {
    const imgurRes = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: imgurForm,
    });
    const data = await imgurRes.json();
    if (data.success) {
      return NextResponse.json({ link: data.data.link });
    } else {
      return NextResponse.json({ error: "Imgur upload failed" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Imgur upload failed" }, { status: 500 });
  }
}
