import { CustomerContainer, SearchContainer } from "../../components/Index.js";
import { useEffect } from "react";
const AllCustomer = () => {
  useEffect(() => {
    document.title = "All Customer";
  }, []);

  return (
    <>
      <SearchContainer />
      <CustomerContainer />
    </>
  );
};

export default AllCustomer;
