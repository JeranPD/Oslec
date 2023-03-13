import { FormRow, Alert } from "../../components/Index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRowSelect from "../FormRowSelect";
import { useEffect } from "react";


const AddCustomer = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    lastName,
    firstName,
    product,
    serialNumber,
    brand,
    replacedParts,
    fixingparts,
    description,
    estimateStart,
    statusOptions,
    status,
    address,
    price,
    handleChange,
    clearValues,
    createCustomer,
    editCustomer,
   
    paymentStatusOptions,
    paymentStatus,
    popularBrandName,
    estimateEnd,
    pickUp,
    pickUpOptions,
    diagnosis,
    replacedPartsPrice,
    popularParts,
    serviceFee,
    partsDelivery,
    
    appliancesType,
    warranting,
    endOfWarranting
  } = useAppContext();
  
  useEffect(() => {
    document.title = "Add Customer";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (
      !lastName ||
      !firstName ||
      !product ||
      !serialNumber ||
      !brand ||
      !fixingparts ||
      !address
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editCustomer();
      return;
    }
    
    createCustomer();
  };

  const handleCustomerInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  const totalPrice = Number(serviceFee) + Number(replacedPartsPrice)
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Update Customer" : "Add Customer"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="last name"
            placeholder="Enter Customer Last Name"
            name="lastName"
            value={lastName}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            labelText="first name"
            placeholder="Enter Customer First Name"
            name="firstName"
            value={firstName}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            labelText="Type of Appliances"
            placeholder="e.g. Television"
            name="appliancesType"
            value={appliancesType}
            handleChange={handleCustomerInput}
          />
          
          <FormRow
            type="text"
            labelText="Appliances Description"
            placeholder="Enter Customer Appliances Description e.g. inches"
            name="product"
            value={product}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            name="serialNumber"
            placeholder="Enter Customer Appliances Serial Number"
            value={serialNumber}
            handleChange={handleCustomerInput}
          />
          
          <div className="brandGrid">
            <FormRowSelect
            labelText='-Select-'
            name="brand"
            value={brand}
            handleChange={handleCustomerInput}
            list={popularBrandName}
            /> 
          <FormRow
            labelText='Brand'
            name="brand"
            placeholder="Enter Customer Appliances Brand"
            value={brand}
            handleChange={handleCustomerInput}
            className="changeFontSize"
            /> 
          </div>
          
          <FormRow
            type="text"
            labelText="Initial diagnosis"
            placeholder="Enter Customer Appliances Another Issue"
            name="diagnosis"
            value={diagnosis}
            handleChange={handleCustomerInput}
          />

          <div className="partsSection">
          <FormRowSelect
            labelText='-Select-'
            name="replacedParts"
            value={replacedParts}
            handleChange={handleCustomerInput}
            list={popularParts}
            /> 

          <FormRow
            type="text"
            labelText="Replacement Parts"
            placeholder="Enter Replacement Parts for Customer Appliances"
            name="replacedParts"
            value={replacedParts}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="number"
            labelText="Price"
            name="replacedPartsPrice"
            value={replacedPartsPrice}
            handleChange={handleCustomerInput}
          />
          </div>
          <FormRow
            type="date"
            labelText="Parts Delivery Date"
            name="partsDelivery"
            value={partsDelivery}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            labelText="Fixing Parts"
            placeholder="Enter a Fixing Parts for Customer Appliances"
            name="fixingparts"
            value={fixingparts}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            labelText="description"
            placeholder="Enter another info about Customer Appliances"
            name="description"
            value={description}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            name="address"
            placeholder="Enter Customer Address"
            value={address}
            handleChange={handleCustomerInput}
          />
          <div className="estimateGrid">
          <FormRow
            type="date"
            labelText="Estimated Start"
            name="estimateStart"
            value={estimateStart}
            handleChange={handleCustomerInput}
          />
         
          <FormRow
            type="date"
            labelText="Estimated End"
            name="estimateEnd"
            value={estimateEnd}
            handleChange={handleCustomerInput}
          />
          </div>

          <FormRow
            type="number"
            labelText="Service Fee"
            name="serviceFee"
            value={serviceFee}
            handleChange={handleCustomerInput}
          />
          
          <FormRow
            type="number"
            labelText={`Total Price: ${totalPrice}`}
            placeholder={totalPrice}
            name="price"
            value={price}
            handleChange={handleCustomerInput}
          />

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleCustomerInput}
            list={statusOptions}
          />

          <FormRowSelect
            name="pickUp"
            value={pickUp}
            handleChange={handleCustomerInput}
            list={pickUpOptions}
          />

          <FormRowSelect
            name="paymentStatus"
            value={paymentStatus}
            handleChange={handleCustomerInput}
            list={paymentStatusOptions}
          />

          <div className="warranting">
            <FormRow
              type="text"
              name="warranting"
              value={warranting}
              handleChange={handleCustomerInput}
            />

            <FormRow
              type="date"
              labelText="End of Warranting"
              name="endOfWarranting"
              value={endOfWarranting}
              handleChange={handleCustomerInput}
            />
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isEditing ? "Update" : "Add Customer"}
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

export default AddCustomer;
