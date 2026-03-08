import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {

  const { uid } = await req.json();

  const userDoc = await adminDb.collection("users").doc(uid).get();

  const userData = userDoc.data();

  return NextResponse.json({
    role: userData?.role
  });
}
