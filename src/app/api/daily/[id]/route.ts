import { reviseDaily, viewDaily } from "@/services/daily.service";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

// revise
export async function PATCH(
    req: NextRequest,
    { params }: { params : { id: string }}
) {
    try {
        const id = params.id;
        const session = await getSession();
        const userId = session?.uid;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const report = await viewDaily(id);
        if (report?.userId !== userId) {
            return NextResponse.json({ error: "Forbidden"}, { status: 403 })
        }

        const data = await req.json();
        const { activities, progress, problems, solution, planTomorrow } = data;

        await reviseDaily(id, activities, progress, problems, solution, planTomorrow);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong"}, { status: 500 });
    }
}

// view
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const session = await getSession();
        const userId = session?.uid;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const report = await viewDaily(id);
        if (!report) {
            return NextResponse.json({ error: "Report not found" },{ status: 404 });
        }

        if (report?.userId !== userId || session.role !== "admin") {
            return NextResponse.json({ error: "Forbidden"}, { status: 403 })
        }

        return NextResponse.json(report, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}