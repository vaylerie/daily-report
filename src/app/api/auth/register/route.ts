/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {

  const { name, email, password } = await req.json();

  try {

    const userRecord = await adminAuth.createUser({
      email,
      password
    });

    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      role: "user",
      createdAt: new Date()
    });

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    return NextResponse.json({
      error: "Register failed"
    }, { status: 400 });

  }
}
