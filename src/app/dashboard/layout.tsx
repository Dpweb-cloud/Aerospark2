import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 min-w-0">
        <div className="p-4 md:p-6 lg:p-8 pt-16 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
