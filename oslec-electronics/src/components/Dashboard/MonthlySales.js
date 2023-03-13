import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading, MonthlySalesContainer } from "../../components/Index.js";
import Wrapper from "../../assets/wrappers/Stats";

const Stats = () => {
  const { showStats, isLoading, monthlyIncome } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <Wrapper>{monthlyIncome.length > 0 && <MonthlySalesContainer />}</Wrapper>
  );
};

export default Stats;
