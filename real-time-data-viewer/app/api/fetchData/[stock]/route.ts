import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: { stock: string } }
) {
  const client = await clientPromise;
  const db = client.db("stockData");
  const collection = db.collection("prices");

  const stock = params.stock.toUpperCase();

  try {
    const data = await collection
      .find({ stock })
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
