import React, { useEffect, useState } from "react";
import CardDataStats from "@/components/CardDataStats";
import ChartOne from "@/components/Charts/ChartOne";
import ChartThree from "@/components/Charts/ChartThree";
import { Eye, Route, UserPlus, UsersRound } from "lucide-react";
import { DashboardResponse, getDashboard } from "@api";

const DashBoard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardResponse>();
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await getDashboard();
        setDashboardData(response);
      } catch (error) {
        console.error("Get dashboard error:", error);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Tổng lượt truy cập"
          total={dashboardData?.totalUserAccess.total.toString() || "0"}
        >
          <Eye color="#3C50E0" />
        </CardDataStats>
        <CardDataStats
          title="Lượt truy cập hôm nay"
          total={dashboardData?.totalUserToday?.total.toString() || "0"}
          rate={dashboardData?.totalUserToday?.changeValue.toString() || "0"}
          levelUp={
            !!dashboardData?.totalUserToday?.changeValue &&
            dashboardData?.totalUserToday?.changeValue >= 0
          }
          levelDown={
            !!dashboardData?.totalUserToday?.changeValue &&
            dashboardData?.totalUserToday?.changeValue < 0
          }
        >
          <UserPlus color="#3C50E0" />
        </CardDataStats>
        <CardDataStats
          title="Tổng số tuyến đường"
          total={dashboardData?.totalStreetCount.total.toString() || "0"}
          rate={dashboardData?.totalStreetCount.changeValue.toString() || "0"}
          levelUp={
            !!dashboardData?.totalStreetCount.changeValue &&
            dashboardData?.totalStreetCount.changeValue >= 0
          }
          levelDown={
            !!dashboardData?.totalStreetCount.changeValue &&
            dashboardData?.totalStreetCount.changeValue < 0
          }
        >
          <Route color="#3C50E0" />
        </CardDataStats>
        <CardDataStats
          title="Tổng nhân viên"
          total={dashboardData?.totalEmployeeCount.total.toString() || "0"}
        >
          <UsersRound color="#3C50E0" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree
          addressChart={
            dashboardData?.addressChart || {
              addressPercentages: []
            }
          }
        />
      </div>
    </>
  );
};

export default DashBoard;
