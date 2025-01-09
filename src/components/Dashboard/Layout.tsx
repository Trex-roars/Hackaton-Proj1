import { Home } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div>
      <Home
        onClick={() => router.push("/")}
        className="fixed top-4 -left-2 z-50 w-20"
      />
      <div className="relative mt-5 max-h-screen text-white overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black" />
        <div className="relative z-20">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
