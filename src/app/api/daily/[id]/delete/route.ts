import { getSession } from "@/lib/session";
import { deleteDaily, viewDaily } from "@/services/daily.service";
import { NextResponse } from "next/server";

// delete
export async function PATCH(
    { params }: { params: { id: string }}
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
            return NextResponse.json({ error: "Forbidden"}, { status:403 })
        }
        
        await deleteDaily(id);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong"}, { status: 500 })
    }
}

