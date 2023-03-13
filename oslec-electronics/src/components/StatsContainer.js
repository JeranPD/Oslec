import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import { FaCheck } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats, monthlytStats, appliances } = useAppContext();

  const defaultStats = [
    {
      title: "pending",
      count: stats.pending || 0,
      icon: <MdPendingActions />,
      color: "#e9b949",
      bcg: "#e0e8f9",
    },
    {
      title: "ongoing",
      count: stats.ongoing || 0,
      icon: <AiFillSetting />,
      color: "#fd424b",
      bcg: "#e0e8f9",
    },
    {
      title: "completed",
      count: stats.completed || 0,
      icon: <FaCheck />,
      color: "#5cb85c",
      bcg: "#e0e8f9",
    },
  ];

  const monthlySales = [
    {
      title: "Monthly Sales",
      count: monthlytStats.latest,
      icon: <FcSalesPerformance />,
      color: "#050a30",
      bcg: "#e0e8f9",
    },
  ];
  
  return (
    <Wrapper>
      {defaultStats.map((item, indx) => {
        return <StatItem key={indx} {...item} />;
      })}
      {monthlySales.map((item, indx) => {
        return <StatItem key={indx} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
