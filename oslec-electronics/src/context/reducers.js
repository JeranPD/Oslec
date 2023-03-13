import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_ADMIN,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_CUSTOMER_BEGIN,
  CREATE_CUSTOMER_ERROR,
  CREATE_CUSTOMER_SUCCESS,
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_SUCCESS,
  SET_EDIT_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_BEGIN,
  EDIT_CUSTOMER_ERROR,
  EDIT_CUSTOMER_SUCCESS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  SHOW_BRANDSTATS_BEGIN,
  SHOW_BRANDSTATS_SUCCESS,
  CHANGE_PAGE_RECORDS,
  GET_RECORDS_BEGIN,
  GET_RECORDS_SUCCESS,
  CREATE_SUPPLIER_BEGIN,
  CREATE_SUPPLIER_ERROR,
  CREATE_SUPPLIER_SUCCESS,
  GET_SUPPLIER_BEGIN,
  GET_SUPPLIER_SUCCESS,
  SET_EDIT_SUPPLIER,
  EDIT_SUPPLIER_BEGIN,
  EDIT_SUPPLIER_SUCCESS,
  EDIT_SUPPLIER_ERROR,
  DELETE_SUPPLIER_SUCCESS,
  CHANGE_PAGE_SUPPLIER,
  GET_CUSTOMERRECEIPT_BEGIN,
  GET_CUSTOMERRECEIPT_SUCCESS,
  SHOW_APPLIANCES_BEGIN,
  SHOW_APPLIANCES_SUCCESS,
  SHOW_SUPPLIERSALES_BEGIN,
  SHOW_SUPPLIERSALES_SUCCESS
} from "./actions";

import { initialState } from "./appContext.js";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all fields",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      admin: action.payload.admin,
      adminLocation: action.payload.location,
      location: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_ADMIN) {
    return {
      ...initialState,
      admin: null,
      token: null,
      adminLocation: "",
      location: "",
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      admin: action.payload.admin,
      adminLocation: action.payload.location,
      location: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "Admin Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editCustomerId: "",
      trackingNumber: "",
      lastName: "",
      firstName: "",
      product: "",
      serialNumber: "",
      brand: "",
      replacedParts: "",
      fixingparts: "",
      description: "",
      estimateStart: "",
      estimateEnd:"",
      status: "pending",
      address: "",
      price: 0,
      warrantyStartAt: "",
      warrantyEndAt: "",
      editSupplierId: "",
      companyName: "",
      name: "",
      Address: "",
      contact: "",
      email: "",
      productOrder: "",
      quantity: "",
      productStatus: "not yet recieve",
      receivedAt: "",
      priced: 0,
      searchSupplier: "",
      searchSupplierStatus: "all",
      sortSupplier: "latest",
      pickUp:'Pick Up',
      diagnosis:'',
      replacedPartsPrice: 0,
      serviceFee: 0,
      partsDelivery: '',
      appliancesType: '',
      warranting: "",
      endOfWarranting: ""
    };
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_CUSTOMER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Customer Added Successfully",
    };
  }

  if (action.type === CREATE_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }
  if (action.type === GET_CUSTOMERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_CUSTOMERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customers: action.payload.customers,
      totalCustomer: action.payload.totalCustomer,
      numofPages: action.payload.numofPages,
    };
  }

  if (action.type === SET_EDIT_CUSTOMER) {
    const customer = state.customers.find(
      (customer) => customer._id === action.payload.id
    );
    const {
      _id,
      lastName,
      firstName,
      product,
      serialNumber,
      brand,
      replacedParts,
      fixingparts,
      description,
      estimateStart,
      status,
      pickUp,
      address,
      price,
      warrantyStartAt,
      warrantyEndAt,
      paymentStatus,
      diagnosis,
      replacedPartsPrice,
      partsDelivery,
      serviceFee,
      appliancesType,
      warranting,
      endOfWarranting
    } = customer;
    
    return {
      ...state,
      isEditing: true,
      editCustomerId: _id,
      lastName,
      firstName,
      product,
      serialNumber,
      brand,
      replacedParts,
      fixingparts,
      description,
      estimateStart,
      status,
      pickUp,
      address,
      price,
      warrantyStartAt,
      warrantyEndAt,
      paymentStatus,
      diagnosis,
      replacedPartsPrice,
      partsDelivery,
      serviceFee,
      appliancesType,
      warranting,
      endOfWarranting
    };
  }

  if (action.type === DELETE_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_CUSTOMER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Customer Updated!",
    };
  }

  if (action.type === EDIT_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }
  if (action.type === SHOW_BRANDSTATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_BRANDSTATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      brandStats: action.payload.brandStats,
      monthlyBrand: action.payload.monthlyBrand,
    };
  }
  if (action.type === SHOW_APPLIANCES_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_APPLIANCES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      appliances: action.payload.appliances,
    };
  }

  if (action.type === SHOW_SUPPLIERSALES_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_SUPPLIERSALES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      supplierFinalData: action.payload.supplierFinalData,
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
      monthlytStats: action.payload.monthlytStats,
      monthlyIncome: action.payload.monthlyIncome,
    };
  }

  if (action.type === GET_RECORDS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false
    };
  }

  if (action.type === GET_RECORDS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      records: action.payload.records,
      totalRecords: action.payload.totalRecords,
      numofRecords: action.payload.numofRecords
    };
  }

  if (action.type === GET_CUSTOMERRECEIPT_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false
    };
  }

  if (action.type === GET_CUSTOMERRECEIPT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customerReceipt: action.payload.customerReceipt,
    };
  }



  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchLastName: '',
      searchFirstName: '',
      searchStatus: "all",
      sort: "latest",
      searchSupplier: "",
      searchSupplierStatus: "all",
      sortSupplier: "latest",
      searchLastNameReceipt: '',
      searchFirstNameReceipt: '',
      searchAllLastName: '',
      searchAllFirstName: '',
    };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  
  if (action.type === CHANGE_PAGE_RECORDS) {
    return { ...state, recordsPage: action.payload.recordsPage };
  }
  if (action.type === CHANGE_PAGE_SUPPLIER) {
    return { ...state, pageSupplier: action.payload.pageSupplier };
  }
  
  // SUPPLIER
  if (action.type === CREATE_SUPPLIER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_SUPPLIER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Supplier Added Successfully",
    };
  }

  if (action.type === CREATE_SUPPLIER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }

  if (action.type === GET_SUPPLIER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_SUPPLIER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      suppliers: action.payload.suppliers,
      totalSupplier: action.payload.totalSupplier,
      numofSupplierPages: action.payload.numofSupplierPages,
    };
  }

  if (action.type === SET_EDIT_SUPPLIER) {
    const supplier = state.suppliers.find(
      (supplier) => supplier._id === action.payload.id
    );
    const {
      _id,
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
      pricedPerUnit
    } = supplier;

    return {
      ...state,
      isEditing: true,
      editSupplierId: _id,
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
      pricedPerUnit
    };
  }

  if (action.type === EDIT_SUPPLIER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_SUPPLIER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Supplier Updated!",
    };
  }

  if (action.type === EDIT_SUPPLIER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }

  if (action.type === DELETE_SUPPLIER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
    };
  }
  throw new Error(`No such action : ${action.type}`);

  

};

export default reducer;
