import { FormRow } from "./Index.js";
import { useAppContext } from "../context/appContext.js";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";

const SearchsalesInvoice = () => {
    const [localSearch, setLocalSearch] = useState('')
    const [localSearchFn, setLocalSearchFn] = useState('')

    const {
        isLoading,
        handleChange,
        clearFilters,
    } = useAppContext();

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

  const align = {textAlign: 'center'}
  return (
    <Wrapper>
        <h2 style={align}><span className="os-color">Cu</span>stomer Invoice</h2>
      <form className="form">
        <h4>search Customer Invoice</h4>
        <div className="form-center">
            <FormRow
                type="text"
                labelText="last name"
                name="searchAllLastName"
                value={localSearch}
                handleChange={optimizedDebounce}
            />
            <FormRow
                type="text"
                labelText="first name"
                name="searchAllFirstName"
                value={localSearchFn}
                handleChange={optimizedDebounceFn}
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

export default SearchsalesInvoice;
