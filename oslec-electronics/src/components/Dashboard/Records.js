import { SearchRecords, RecordsContainer} from "../../components/Index.js";
import { useEffect } from "react";

const Records = () => {
  useEffect(() => {
    document.title = "Customer Records";
  }, []);

  return (
    <>
    <SearchRecords />
    <RecordsContainer />
  </>
  );
};

export default Records;
