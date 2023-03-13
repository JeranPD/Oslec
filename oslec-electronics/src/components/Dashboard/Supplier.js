import {  SupplierContainer, SupplierSearchContainer, SupplierForm } from "../../components/Index.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Supplier = () => {
  useEffect(() => {
    document.title = "Supplier";
  }, []);

  return (
    <>
      <SupplierSearchContainer />
      <Link
        to="/dashboard/add-supplier"
        className="btn edit-btn"
        >
            Add New Supplier
        </Link>
      <SupplierContainer />
    </>
  );
};

export default Supplier;
