import { NextRequest, NextResponse } from "next/server";
import { createDaily, getDaily } from "@/services/daily.service";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        const userId = session?.uid;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        };

        const data = await req.json();
        if (!data.title || !data.activities) {
            return NextResponse.json({ error: "Title and activities are required" }, { status: 400 })
        }

        await createDaily(userId, data);
        return NextResponse.json({ success: true }, { status: 201 })     
    } catch {
        return NextResponse.json({ error: "Something went wrong"}, { status: 500})
    }

}

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        const userId = session?.uid;
        const role = session?.role;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" },{ status: 401 });
        }

        const searchParams = req.nextUrl.searchParams;

        const title = searchParams.get("title") || undefined;
        const date = searchParams.get("date") || undefined;
        const status = searchParams.get("status") || undefined;

        const reports = await getDaily(
        userId,
        role === "admin",
        title,
        date,
        status
        );

        return NextResponse.json({ data: reports },{ status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" },{ status: 500 });
    }
}