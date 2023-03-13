import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, OverdueAlert } from "../../components/Index.js";
import Wrapper from "../../assets/wrappers/Stats";
import LatesCustomer from "../LatesCustomer";

const Stats = () => {
  const {
    showStats,
    showBrandStats,
  } = useAppContext();

  useEffect(() => {
    showStats();
    showBrandStats();
    document.title = "Dashboard";
  }, []);

  return (
    <Wrapper>
      <StatsContainer />
      <OverdueAlert />
      {/* <LatesCustomer /> */}
    </Wrapper>
  );
};

export default Stats;
