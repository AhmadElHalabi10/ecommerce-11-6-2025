import { redirect } from "next/navigation";

export default function DashboardIndex() {
  // Option 1: Redirect to the main dashboard
  redirect("/dashboard/dashboard");

  // Option 2: Render a dashboard home page
  // return <div>Welcome to the Dashboard!</div>;
}
