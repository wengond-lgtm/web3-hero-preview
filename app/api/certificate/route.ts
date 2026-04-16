import { NextResponse } from "next/server";

const certificates = {
  "XPAR-X200-2026": {
    found: true,
    device_model: "XPAR X200",
    calibration_date: "2026-03-18",
    pdf_url: "#"
  },
  "XPAR-X100-2026": {
    found: true,
    device_model: "XPAR X100",
    calibration_date: "2026-02-24",
    pdf_url: "#"
  }
};

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serialNumber = searchParams.get("sn")?.trim().toUpperCase() ?? "";
  const result = certificates[serialNumber as keyof typeof certificates];

  return NextResponse.json(
    result ?? {
      found: false
    }
  );
}
