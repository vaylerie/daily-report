import { db } from "@/lib/firebase";
import { 
    setDoc,
    updateDoc,
    doc,
    collection, 
    query, 
    where, 
    getDocs,
    addDoc,
    getDoc,
    QueryConstraint, 
    serverTimestamp
} from "firebase/firestore";
import { DailyReport } from "@/types/report.type";
import { generateId } from "@/lib/utils";

export async function createDaily(
    userId: string,
    data: {
        title: string,
        activities: string,
        progress?: string,
        problems?: string,
        solution?: string,
        planTomorrow?: string,        
    }
) {
    const id = generateId(userId);

    await setDoc(doc(db, "reports", id), {
        id,
        userId,
        ...data,    
        status: "pending",
        createdAt: serverTimestamp(),
    });
}

export async function getDaily(
    userId: string,
    isAdmin: boolean,
    title?: string,
    date?: string,
    status?: string
) {
    const conditions: QueryConstraint[] = [];

    if (!isAdmin) {
        conditions.push(where("userId", "==", userId));
    }

    if (isAdmin && title) {
        conditions.push(where("title", "==", title));
    }

    if (isAdmin && date) {
        conditions.push(where("date", "==", date));
    }

    if (isAdmin && status) {
        conditions.push(where("status", "==", status));
    }

    const q = query(
        collection(db, "reports"),
        ...conditions
    );

    const snapshot = await getDocs(q);

    const reports = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return reports;
}

export async function viewDaily(id: string): Promise<DailyReport | null> {

  const docRef = doc(db, "reports", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<DailyReport, "id">)
  };
}

export async function reviewDaily(
    id: string,
    reviewedBy: string,
    status: "pending" | "approved" | "revision",
    comment?: string,
) {
    const docRef = doc(db, "reports", id);
    const data: Record<string, unknown> = {
        reviewedBy: reviewedBy,
        reviewedAt: serverTimestamp(),
        status: status,
    };

    await updateDoc(docRef, data);
    if (comment) {
        await addDoc(collection(db, "reports", id, "comments"), {
        reportId: id,
        userId: reviewedBy,
        message: comment,
        createdAt: serverTimestamp()
        });
    }
}

export async function reviseDaily(
    id: string,
    activities?: string,
    progress?: string,
    problems?: string,
    solution?: string,
    planTomorrow?: string,    
) {
    const docRef = doc(db, "reports", id);
    const data: Record<string, unknown> = {

    }
    
    if (activities) data.activities = activities;
    if (progress) data.progress = progress;
    if (problems) data.problems = problems;
    if (solution) data.solution = solution;
    if (planTomorrow) data.planTomorrow = planTomorrow;

    data.updatedAt = serverTimestamp();
    data.status = "pending";

    await updateDoc(docRef, data);
}

export async function deleteDaily(id: string,) {
    const docRef = doc(db, "reports", id);
    await updateDoc(docRef, {
        deleted: true,
        deletedAt: serverTimestamp()
    });
}