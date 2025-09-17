import MainLayout from "@/layouts/main";
import ScreenerFilters from "@/components/screener-filters";
import ScreenerTable from "@/components/screener-table";
import ScreenerCharts from "@/components/screener-charts";

export default function ScreenerPage() {
  return (
    <MainLayout showSubNav={true}>
      {/* Screener Filters */}
      <ScreenerFilters />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Screener Results Table */}
        <div className="lg:col-span-2">
          <ScreenerTable />
        </div>

        {/* Right Column - Charts and Key Metrics */}
        <div className="lg:col-span-1">
          <ScreenerCharts />
        </div>
      </div>
    </MainLayout>
  );
}
