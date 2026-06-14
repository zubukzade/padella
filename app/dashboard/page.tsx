import type { Metadata } from "next";
import { Dashboard } from "@/components/views/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Padella dashboard — matches, stats, rankings, clubs and orders.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
