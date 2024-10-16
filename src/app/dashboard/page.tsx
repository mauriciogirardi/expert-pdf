import { Dashboard } from "@/components/dashboard";
import { getUser } from "@/http/getUser";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { user } = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  return <Dashboard />;
}
