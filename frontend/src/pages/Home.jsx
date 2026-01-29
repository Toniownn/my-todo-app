import React, { useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Dashboard from "@/components/dashboard/Dashboard";

import { Menu } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-muted text-foreground">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Hamburger for mobile */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded bg-background shadow"
            >
              <Menu size={24} />
            </button>
          </div>

          <DashboardHeader darkMode={darkMode} setDarkMode={setDarkMode} />
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
