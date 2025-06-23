"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Users, Package, DollarSign, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect non-admins
  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading" || session?.user?.role !== "admin") {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  const stats = [
    {
      name: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: Users,
    },
    {
      name: "Total Products",
      value: "567",
      change: "+8%",
      changeType: "positive",
      icon: Package,
    },
    {
      name: "Revenue",
      value: "$12,345",
      change: "+23%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      name: "Growth",
      value: "15%",
      change: "+2%",
      changeType: "positive",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 ml-1">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                New user registered: john.doe@example.com
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                Product "Wireless Headphones" was updated
              </p>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                Order #12345 was completed
              </p>
              <span className="text-xs text-gray-400">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
