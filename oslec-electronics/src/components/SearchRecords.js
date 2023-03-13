import { FormRow, FormRowSelect } from "./Index.js";
import { useAppContext } from "../context/appContext.js";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";

const SearchRecords = () => {
  const [localSearch, setLocalSearch] = useState('')
  const [localSearchFn, setLocalSearchFn] = useState('')
  const {
    isLoading,
    sort,
    handleChange,
    clearFilters,
    sortRecordsOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('')
    setLocalSearchFn('')
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

  const debounceFn = () =>{
    let timeoutID;
    return (e) =>{
      setLocalSearchFn(e.target.value)
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 500)
    }
  }
  const optimizedDebounceFn = useMemo(() => debounceFn(), [])
  return (
    <Wrapper>
      <form className="form">
        <h4>search Customer </h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="last name"
            name="searchLastName"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRow
            type="text"
            labelText="first name"
            name="searchFirstName"
            value={localSearchFn}
            handleChange={optimizedDebounceFn}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortRecordsOptions}
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

export default SearchRecords;
