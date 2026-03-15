import { NextRequest, NextResponse } from "next/server";
import { reviewDaily } from "@/services/daily.service";
import { getSession } from "@/lib/session";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const session = await getSession();
        const userId = session?.uid;
        if (!userId || session?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
        }

        const data = await req.json();
        const { status, comment } = data;

        await reviewDaily(id, userId, status, comment);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong"}, { status: 500 })
    }
}