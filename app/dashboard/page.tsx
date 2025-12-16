"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getDashboardSummary } from "../../src/api/dashboard";
import type { DashboardStats, Deal, Task } from "../../src/types";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  CheckSquare,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Home", path: "/dashboard", icon: LayoutDashboard },
  { label: "Deals", path: "/deals", icon: TrendingUp },
  { label: "Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Customers", path: "/customers", icon: Users },
];

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentDeals, setRecentDeals] = useState<Deal[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTeamspaceOpen, setIsTeamspaceOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const name =
      localStorage.getItem("userName") ||
      localStorage.getItem("name") ||
      "User";
    setUserName(name);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const summary = await getDashboardSummary().catch(() => null);

      const summaryStats =
        summary?.stats ??
        ({
          totalCustomers: summary?.totalCustomers ?? 0,
          activeDeals: summary?.activeDeals ?? summary?.totalDeals ?? 0,
          dealsWon: summary?.dealsWon ?? 0,
          pendingTasks: summary?.pendingTasks ?? summary?.activeTasks ?? 0,
        } satisfies DashboardStats);

      setStats(summaryStats);
      setRecentDeals(
        Array.isArray(summary?.recentDeals) ? summary.recentDeals : []
      );
      setUpcomingTasks(
        Array.isArray(summary?.upcomingTasks) ? summary.upcomingTasks : []
      );
      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(path);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#f4f6f8] overflow-hidden">
        <aside className="w-64 bg-[#1a233a] flex flex-col shadow-lg">
          <div className="px-4 py-4 border-b border-[#25304a]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CRM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                  CRM Teamspace
                </span>
                <span className="text-xs text-gray-400">Acme Corp</span>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Welcome <span className="font-semibold">{userName}</span>
              </h2>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-[#f4f6f8] p-6 flex items-center justify-center">
            <div className="text-gray-600">Loading dashboard...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f4f6f8] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#1a233a] flex flex-col shadow-lg">
        {/* CRM Teamspace Header */}
        <div className="px-4 py-4 border-b border-[#25304a]">
          <button
            onClick={() => setIsTeamspaceOpen(!isTeamspaceOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CRM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                  CRM Teamspace
                </span>
                <span className="text-xs text-gray-400">Acme Corp</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isTeamspaceOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-[#25304a] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Welcome <span className="font-semibold">{userName}</span>
            </h2>
          </div>
          <div className="relative flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {userName}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-gray-200 my-1" />
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#f4f6f8] p-6">
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded p-6">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  Total Customers
                </div>
                <div className="text-3xl font-semibold text-gray-900">
                  {stats?.totalCustomers || 0}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded p-6">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  Active Deals
                </div>
                <div className="text-3xl font-semibold text-gray-900">
                  {stats?.activeDeals || 0}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded p-6">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  Deals Won
                </div>
                <div className="text-3xl font-semibold text-gray-900">
                  {stats?.dealsWon || 0}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded p-6">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  Pending Tasks
                </div>
                <div className="text-3xl font-semibold text-gray-900">
                  {stats?.pendingTasks || 0}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Deals
                  </h2>
                </div>
                <div className="p-6">
                  {recentDeals.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No recent deals
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {recentDeals.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => router.push(`/deals/${deal.id}`)}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">
                              {deal.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {deal.customerName}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">
                              ${deal.value.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {deal.stage}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upcoming Tasks
                  </h2>
                </div>
                <div className="p-6">
                  {upcomingTasks.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No upcoming tasks
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {upcomingTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start gap-3 p-3 border border-gray-200 rounded"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">
                              {task.title}
                            </div>
                            {task.dealTitle && (
                              <div className="text-xs text-gray-500 mt-1">
                                {task.dealTitle}
                              </div>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {task.assignedUserName}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
