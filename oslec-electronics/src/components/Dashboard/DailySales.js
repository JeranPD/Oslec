import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  ChartsContainer,
  Loading,
} from "../../components/Index.js";
import Wrapper from "../../assets/wrappers/Stats";

const DailySales = () => {
  const {
    showStats,
    isLoading,
    monthlyApplications,
  } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <Wrapper>{monthlyApplications.length > 0 && <ChartsContainer />}</Wrapper>
  );
};

export default DailySales;
