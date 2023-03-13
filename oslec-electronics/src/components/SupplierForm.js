import { FormRow, Alert } from "./Index";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRowSelect from "./FormRowSelect";
import { useEffect } from "react";


const AddSupplier = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    handleChange,
    clearValues,
    createSupplier,
    companyName,
    name,
    Address,
    contact,
    email,
    productOrder,
    quantity,
    productStatus,
    receivedAt,
    priced,
    editSupplier,
    statusSupplierOptions,
    pricedPerUnit
  } = useAppContext();
  
  useEffect(() => {
    document.title = "Add Supplier";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
        !companyName ||
        !name ||
        !Address ||
        !contact ||
        !email ||
        !productOrder ||
        !quantity ||
        !productStatus 
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editSupplier();
      return;
    }
    createSupplier();
  };
 let f;
  const handleCustomerInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };


  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Update Supplier" : "Add Supplier"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
        <FormRow
            type="text"
            labelText="Company Name"
            name="companyName"
            value={companyName}
            handleChange={handleCustomerInput}
          />
  
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            name="Address"
            value={Address}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            name="contact"
            value={contact}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            name="email"
            value={email}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            labelText="Product Order"
            name="productOrder"
            value={productOrder}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="number"
            name="quantity"
            value={quantity}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            labelText="Price Per unit"
            name="pricedPerUnit"
            value={pricedPerUnit}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            labelText="Total price"
            name="priced"
            value={priced}
            handleChange={handleCustomerInput}
          />

          <FormRowSelect
            type="text"
            labelText="Product Status"
            name="productStatus"
            value={productStatus}
            handleChange={handleCustomerInput}
            list={statusSupplierOptions}
          />

          <FormRow
            type="date"
            labelText="Received At"
            name="receivedAt"
            value={receivedAt}
            handleChange={handleCustomerInput}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isEditing ? "Update" : "Add Supplier"}
            </button>
          </div>

          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddSupplier;
