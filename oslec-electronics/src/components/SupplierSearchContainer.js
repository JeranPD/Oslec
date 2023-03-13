import { FormRow, FormRowSelect } from "./Index.js";
import { useAppContext } from "../context/appContext.js";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";

const SupplierSearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const {
    isLoading,
    searchSupplierStatus,
    sortSupplier,
    sortSupplierOptions,
    handleChange,
    clearFilters,
    statusSupplierOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('')
    clearFilters();
  };

  const debounce = () =>{
    let timeoutID;
    return (e) =>{
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 500)
    }
  }
  const optimizedDebounce = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <form className="form">
        <h4>search Supplier </h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Search Supplier"
            name="searchSupplier"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRowSelect
            labelText="Product Status"
            name="searchSupplierStatus"
            value={searchSupplierStatus}
            handleChange={handleSearch}
            list={["all", ...statusSupplierOptions]}
          />
          <FormRowSelect
          labelText="Sort"
            name="sortSupplier"
            value={sortSupplier}
            handleChange={handleSearch}
            list={sortSupplierOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SupplierSearchContainer;
