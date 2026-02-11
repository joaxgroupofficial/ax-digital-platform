"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { getMe } from "@/lib/auth";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const user = await getMe();
      if (!user) {
        router.replace("/login")
        return;
      }

      setLoading(false);
    }
    checkAuth();
  }, [router]);
  if (loading) return null;
  return (

    <div className="h-screen flex overflow-hidden">
      <div className="w-64 fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        <div className="h-16 fixed top-0 left-64 right-0 z-30 bg-white border-b">
          <Navbar />
        </div>

        <main className="flex-1 mt-16 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>

  );

}
