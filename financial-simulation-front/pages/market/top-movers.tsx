import MainLayout from "@/layouts/main";
import TopMoversTable from "@/components/top-movers-table";

export default function TopMoversPage() {
  return (
    <MainLayout showSubNav={true}>
      {/* Top Movers Table */}
      <TopMoversTable />
    </MainLayout>
  );
}
