"use client";

import { logout } from "@/lib/auth";
import { Typography, Button } from "@material-tailwind/react";

export default function Navbar() {
  const handleLogout = async () => {
    await logout ();
  }
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b z-50 flex items-center px-6">
      <div className="font-semibold"></div>
      <div className="ml-auto">
        <Button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded">
          Log out
        </Button>
      </div>
    </header>
  );
}