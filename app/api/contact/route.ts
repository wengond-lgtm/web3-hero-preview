import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("XPAR contact inquiry", body);

  return NextResponse.json({
    ok: true,
    message: "Inquiry received. The XPAR team will respond shortly."
  });
}
