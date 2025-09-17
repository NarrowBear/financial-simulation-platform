import MainLayout from "@/layouts/main";
import SectorsOverview from "@/components/sectors-overview";
import SectorsTable from "@/components/sectors-table";
import SectorDetailCard from "@/components/sector-detail-card";
import SectorNewsCard from "@/components/sector-news-card";

export default function SectorsPage() {
  return (
    <MainLayout showSubNav={true}>
      {/* Sectors Overview Cards */}
      <SectorsOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Sectors Table */}
        <div className="lg:col-span-2">
          <SectorsTable />
        </div>

        {/* Right Column - Sector Detail and News */}
        <div className="lg:col-span-1 space-y-6">
          <SectorDetailCard />
          <SectorNewsCard />
        </div>
      </div>
    </MainLayout>
  );
}
