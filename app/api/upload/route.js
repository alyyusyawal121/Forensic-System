import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file" });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const preset = process.env.CLOUDINARY_UPLOAD_PRESET;

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

    const dataForm = new FormData();
    dataForm.append("file", file);
    dataForm.append("upload_preset", preset);

    // 🔥 penting agar cloudinary tidak salah deteksi
    dataForm.append("resource_type", "raw");

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: dataForm,
    });

    const json = await res.json();

    if (json.error) {
      console.log("Cloudinary ERROR:", json);
      return NextResponse.json({ success: false, error: json.error.message });
    }

    return NextResponse.json({ success: true, url: json.secure_url });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" });
  }
}
