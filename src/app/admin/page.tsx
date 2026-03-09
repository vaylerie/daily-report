"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminPage() {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

return (
    <div>

      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

    </div>
  );
}
