import { NextResponse } from "next/server";

const validSerialNumbers = new Set([
  "SP0226030002",
  "SP0226030006",
  "SP0226030010",
  "SP0226030017",
  "SP0226030018",
  "SP0226030020",
  "SP0226030025",
  "SP0226030032",
  "SP0226030034",
  "SP0226030037",
  "SP0226030039",
  "SP0226030041",
  "SP0226030042",
  "SP0226030047",
  "SP0226030048",
  "SP0226030050",
  "SP0226030051",
  "SP0226030052",
  "SP0226030057",
  "SP0226030059",
  "SP0226030063",
  "SP0226030064",
  "SP0226030067",
  "SP0226030073",
  "SP0226030074",
  "SP0226030078",
  "SP0226030081",
  "SP0226030082",
  "SP0226030083",
  "SP0226030084",
  "SP0226030087",
  "SP0226030088",
  "SP0226030091",
  "SP0226030094",
  "SP0226030097",
  "SP0226030100",
  "SP0226030102",
  "SP0226030103",
  "SP0226030105",
  "SP0226030107",
  "SP0226030109",
  "SP0226030110",
  "SP0226030111",
  "SP0226030116",
  "SP0226030117",
  "SP0226030118",
  "SP0226030119",
  "SP0226030123",
  "SP0226030124",
  "SP0226030125",
  "SP0226030129",
  "SP0226030134",
  "SP0226030135",
  "SP0226030136",
  "SP0226030137",
  "SP0226030138",
  "SP0226030140",
  "SP0226030143",
  "SP0226030147",
  "SP0226030148"
]);

type CertificateResponse = { found: boolean; sn?: string };

export function GET(request: Request): Response {
  const { searchParams } = new URL(request.url);
  const serialNumber = searchParams.get("sn")?.trim().toUpperCase() ?? "";

  const result: CertificateResponse = validSerialNumbers.has(serialNumber)
    ? { found: true, sn: serialNumber }
    : { found: false };

  return NextResponse.json(result);
}
