import React from "react";
import CardDataStats from "@/components/CardDataStats";
import ChartOne from "@/components/Charts/ChartOne";
import ChartThree from "@/components/Charts/ChartThree";
import { Eye, Route, UserPlus, UsersRound } from "lucide-react";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Tổng lượt truy cập"
          total="3.456K"
          rate="0.43%"
          levelUp
        >
          <Eye color="#3C50E0" />
        </CardDataStats>
        <CardDataStats
          title="Lượt truy cập hôm nay"
          total="45K"
          rate="4.35%"
          levelUp
        >
          <UserPlus color="#3C50E0" />
        </CardDataStats>
        <CardDataStats
          title="Tổng số tuyến đường"
          total="2.450"
          rate="2.59%"
          levelUp
        >
          <Route color="#3C50E0" />
        </CardDataStats>
        <CardDataStats
          title="Tổng nhân viên"
          total="3.456"
          rate="2.59%"
          levelUp
        >
          <UsersRound color="#3C50E0" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
      </div>
    </>
  );
};

export default DashBoard;
