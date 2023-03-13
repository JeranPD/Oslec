import { FormRow, FormRowSelect } from "./Index.js";
import { useAppContext } from "../context/appContext.js";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const [searchLN, setSearchLN] = useState('')
  const [searchFN, setSearchFN] = useState('')
  const {
    isLoading,
    searchStatus,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    statusContainerOptions
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('')
    setSearchFN('')
    setSearchLN('')
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

  const searchFirstName = () =>{
    let timeoutID;
    return (e) =>{
      setSearchFN(e.target.value)
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 500)
    }
  }
  const optimizedDebounceFN = useMemo(() => searchFirstName(), [])

  const searchLastName = () =>{
    let timeoutID;
    return (e) =>{
      setSearchLN(e.target.value)
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 500)
    }
  }
  const optimizedDebounceLN = useMemo(() => searchLastName(), [])

  return (
    <Wrapper>
      <form className="form">
        <h4>search Customer </h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          <FormRow
            type="text"
            labelText="Last name"
            name="searchAllLastName"
            value={searchLN}
            handleChange={optimizedDebounceLN}
          />

          <FormRow
            type="text"
            labelText="first name"
            name="searchAllFirstName"
            value={searchFN}
            handleChange={optimizedDebounceFN}
          />

          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusContainerOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
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

export default SearchContainer;
