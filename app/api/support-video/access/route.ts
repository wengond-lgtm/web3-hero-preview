import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const passwordHash = Buffer.from("177faf1738baa7e9ed98f63402d3aad1ee82bb33a5015812115f81204a0a3683", "hex");
const videoUrl = "https://ik.imagekit.io/fus8k8qbu/ios%200923(1).mp4";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = body?.password;
  if (typeof password !== "string" || password.length > 128) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const submittedHash = createHash("sha256").update(password).digest();
  if (!timingSafeEqual(submittedHash, passwordHash)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ url: videoUrl }, { headers: { "Cache-Control": "no-store" } });
}
