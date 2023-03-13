import React, { useReducer, useContext } from "react";
import reducer from "./reducers";
import axios from "axios";
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

const token = localStorage.getItem("token");
const admin = localStorage.getItem("admin");
const adminLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  admin: admin ? JSON.parse(admin) : null,
  token: token,
  adminLocation: adminLocation || "",
  location: adminLocation || "",
  showSidebar: false,
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
  estimateEnd: "",
  statusOptions: ["pending", "ongoing", "completed"],
  paymentStatusOptions: ["unpaid", "paid"],
  paymentStatus: "unpaid",
  statusContainerOptions: ["pending", "ongoing", "completed"],
  status: "pending",
  address: "",
  price: '',
  warrantyStartAt: "",
  warrantyEndAt: "",
  customers: [],
  totalCustomer: 0,
  numofPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  brandStats: {},
  monthlyBrand: [],
  monthlytStats: {},
  monthlyIncome: [],
  records: [],
  totalRecords: 0,
  numofRecords: 1,
  recordsPage: 1,
  searchLastName: '',
  searchFirstName: '',
  sortRecordsOptions: ["latest", "oldest", "a-z", "z-a"],
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
  sortSupplierOptions: ["latest", "oldest", "a-z", "z-a"],
  statusSupplierOptions: ["not yet recieve", "recieved"],
  pageSupplier: 1,
  totalSupplier: 0,
  suppliers: [],
  numofSupplierPages: 1,
  searchLastNameReceipt: '',
  searchFirstNameReceipt: '',
  customerReceipt: [],
  searchAllLastName: '',
  searchAllFirstName: '',
  popularBrandName: ["LG", "Samsung", "Devant", "Condura", "Haier", "Panasonic", "Sharp", "Toshiba", "Whirlpool", "Sony"],
  pickUpOptions: ["Pick Up", "Delivery", "Pick Up and Delivery"],
  pickUp: "Pick Up",
  pricedPerUnit: '',
  diagnosis: '',
  replacedPartsPrice: 0,
  popularParts: ["Concave Led backlight Set", "Convex Led Backlight Set", "Power Modules", "Dvd Lens", "Elctricfan Capacitors", "Electrolytic capacitor", "Power Transistors",
                  "Small transistor", "Soldering lead", "Boston 18 awg wire", "Jumping wires"],
  serviceFee: 0,
  partsDelivery: '',
  WarrantyDays: 100,
  appliancesType: '',
  appliances: [],
  supplierFinalData:[],
  warranting: "",
  endOfWarranting: ""
};

console.log(initialState);
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutAdmin();
      }
      return Promise.reject(error);
    }
  );
  
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addAdminToLocalStorage = ({ admin, token, location }) => {
    localStorage.setItem("admin", JSON.stringify(admin));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeAdminFromLocalStorage = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const setUpUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { admin, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { admin, token, location, alertText },
      });
      addAdminToLocalStorage({ admin, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutAdmin = () => {
    dispatch({ type: LOGOUT_ADMIN });
    removeAdminFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { admin, token, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { admin, location, token },
      });
      addAdminToLocalStorage({ admin, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { message: error.response.data.message },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };

  // CUSTOMER
  const createCustomer = async () => {
    dispatch({ type: CREATE_CUSTOMER_BEGIN });
    try {
      const {
        lastName,
        firstName,
        product,
        serialNumber,
        brand,
        replacedParts,
        fixingparts,
        description,
        estimateStart,
        estimateEnd,
        status,
        pickUp,
        address,
        price,
        warrantyStartAt,
        warrantyEndAt,
        diagnosis,
        replacedPartsPrice,
        serviceFee,
        partsDelivery,
        WarrantyDays,
        appliancesType,
        warranting,
        endOfWarranting
      } = state;

      await authFetch.post("/customer", {
        lastName,
        firstName,
        product,
        serialNumber,
        brand,
        replacedParts,
        fixingparts,
        description,
        estimateStart,
        estimateEnd,
        status,
        pickUp,
        address,
        price,
        warrantyStartAt,
        warrantyEndAt,
        diagnosis,
        replacedPartsPrice,
        serviceFee,
        partsDelivery,
        WarrantyDays,
        appliancesType,
        warranting,
        endOfWarranting
      });
      dispatch({
        type: CREATE_CUSTOMER_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CUSTOMER_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const getCustomers = async () => {
    const { page, search, searchAllLastName, searchAllFirstName, searchStatus, sort } = state;

    let url = `/customer?page=${page}&status=${searchStatus}&sort=${sort}`;
    if (search || searchAllLastName || searchAllFirstName) {
      url = url + `&search=${search}&searchAllLastName=${searchAllLastName}&searchAllFirstName=${searchAllFirstName}`;
    }
    dispatch({ type: GET_CUSTOMERS_BEGIN });

    try {
      const { data } = await authFetch(url);
      console.log(data);
      const { customers, totalCustomer, numofPages } = data;
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: { customers, totalCustomer, numofPages },
      });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const setEditCustomer = (id) => {
    dispatch({ type: SET_EDIT_CUSTOMER, payload: { id } });
  };

  const editCustomer = async () => {
    dispatch({ type: EDIT_CUSTOMER_BEGIN });

    try {
      const {
        lastName,
        firstName,
        product,
        serialNumber,
        brand,
        replacedParts,
        fixingparts,
        description,
        estimateStart,
        estimateEnd,
        status,
        pickUp,
        address,
        price,
        warrantyStartAt,
        warrantyEndAt,
        paymentStatus,
        diagnosis,
        replacedPartsPrice,
        serviceFee,
        partsDelivery,
        appliancesType,
        warranting,
        endOfWarranting
      } = state;
      await authFetch.patch(`/customer/${state.editCustomerId}`, {
        lastName,
        firstName,
        product,
        serialNumber,
        brand,
        replacedParts,
        fixingparts,
        description,
        estimateStart,
        estimateEnd,
        status,
        pickUp,
        address,
        price,
        warrantyStartAt,
        warrantyEndAt,
        paymentStatus,
        diagnosis,
        replacedPartsPrice,
        serviceFee,
        partsDelivery,
        appliancesType,
        warranting,
        endOfWarranting
      });
      dispatch({
        type: EDIT_CUSTOMER_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_CUSTOMER_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const deleteCustomer = async (customerId) => {
    dispatch({ type: DELETE_CUSTOMER_SUCCESS });

    try {
      await authFetch.delete(`/customer/${customerId}`);
      getCustomers();
    } catch (error) {
      console.log(error.response);
      // logoutAdmin();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });

    try {
      const { data } = await authFetch(`/customer/stats`);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
          monthlytStats: data.monthlytStats,
          monthlyIncome: data.monthlyIncome,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutAdmin();
    }
  };

  const showBrandStats = async () => {
    dispatch({ type: SHOW_BRANDSTATS_BEGIN });

    try {
      const { data } = await authFetch(`/customer/stats`);
      dispatch({
        type: SHOW_BRANDSTATS_SUCCESS,
        payload: {
          brandStats: data.brandDefaultStats,
          monthlyBrand: data.monthlyBrand,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutAdmin();
    }
  };

  const showAppliances = async () => {
    dispatch({ type: SHOW_APPLIANCES_BEGIN });
  
    try {
      const { data } = await authFetch(`/customer/appliances`);
      dispatch({
        type: SHOW_APPLIANCES_SUCCESS,
        payload: {
          appliances: data.appliances,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutAdmin();
    }
  };

  const showSupplier = async () => {
    dispatch({ type: SHOW_SUPPLIERSALES_BEGIN });
    
    try {
      const { data } = await authFetch(`/supplier/sales`);
      dispatch({
        type: SHOW_SUPPLIERSALES_SUCCESS,
        payload: {
          supplierFinalData: data.supplierFinalData,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutAdmin();
    }
  };

  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTERS,
    });
  };

  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: { page },
    });
  };

  const changePageRecords = (recordsPage) => {
    dispatch({
      type: CHANGE_PAGE_RECORDS,
      payload: { recordsPage },
    });
  };

  const changePageSupplier = (pageSupplier) => {
    dispatch({
      type: CHANGE_PAGE_SUPPLIER,
      payload: { pageSupplier },
    });
  };

  const trackCustomer = async () => {
    dispatch({ type: GET_CUSTOMERS_BEGIN });
    try {
      const { data } = await axios.get(`/api/v2/tracking`);
      const { customers } = data;
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: {
          customers,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRecords = async () => {
    const {recordsPage,searchLastName, searchFirstName, sort} = state;
    let url = `/customer/records?page=${recordsPage}&sort=${sort}`;
    if(searchLastName || searchFirstName){
      url = url + `&searchLastName=${searchLastName}&searchFirstName=${searchFirstName}`
    }
    dispatch({type: GET_RECORDS_BEGIN})

    try {
      const {data} = await authFetch(url);
      const {records, totalRecords, numofRecords} = data
      dispatch({
        type: GET_RECORDS_SUCCESS,
        payload: {
          records, 
          totalRecords, 
          numofRecords
        }
      })
    } catch(error){
      console.log(error.response)
    }
    clearAlert()
  }

  const getCustomerReceipt = async () => {
    const {searchLastNameReceipt, searchFirstNameReceipt} = state;
    let url = `/customer/customerReceipt?`;
    if(searchLastNameReceipt || searchFirstNameReceipt){
      url = url + `&searchLastName=${searchLastNameReceipt}&searchFirstName=${searchFirstNameReceipt}`
    }
    dispatch({type: GET_CUSTOMERRECEIPT_BEGIN})
    
    try {
      const {data} = await authFetch(url);
      const {customerReceipt} = data
      dispatch({
        type: GET_CUSTOMERRECEIPT_SUCCESS,
        payload: {
          customerReceipt, 
        }
      })
    } catch(error){
      console.log(error.response)
    }
    clearAlert()
  }

  // SUPPLIER
  const createSupplier = async () => {
    dispatch({ type: CREATE_SUPPLIER_BEGIN });
    try {
      const {
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
      } = state;

      await authFetch.post("/supplier", {
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
      });
      dispatch({
        type: CREATE_SUPPLIER_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_SUPPLIER_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const getSupplier = async () => {
    const { pageSupplier, searchSupplier, searchSupplierStatus, sortSupplier } = state;

    let url = `/supplier?page=${pageSupplier}&productStatus=${searchSupplierStatus}&sortSupplier=${sortSupplier}`;
    if (searchSupplier) {
      url = url + `&searchSupplier=${searchSupplier}`;
    }
    dispatch({ type: GET_SUPPLIER_BEGIN });

    try {
      const { data } = await authFetch(url);
      console.log(data);
      const { suppliers, totalSupplier, numofSupplierPages } = data;
      dispatch({
        type: GET_SUPPLIER_SUCCESS,
        payload: { suppliers, totalSupplier, numofSupplierPages },
      });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const setEditSupplier = (id) => {
    dispatch({ type: SET_EDIT_SUPPLIER, payload: { id } });
  };

  const editSupplier = async () => {
    dispatch({ type: EDIT_SUPPLIER_BEGIN });

    try {
      const {
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
      } = state;
      await authFetch.patch(`/supplier/${state.editSupplierId}`, {
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
      });
      dispatch({
        type: EDIT_SUPPLIER_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_SUPPLIER_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const deleteSupplier = async (supplierId) => {
    dispatch({ type: DELETE_SUPPLIER_SUCCESS });

    try {
      await authFetch.delete(`/supplier/${supplierId}`);
      getSupplier();
    } catch (error) {
      console.log(error.response);
      // logoutAdmin();
    }
  };
  
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setUpUser,
        toggleSidebar,
        logoutAdmin,
        updateUser,
        handleChange,
        clearValues,
        createCustomer,
        getCustomers,
        setEditCustomer,
        deleteCustomer,
        editCustomer,
        showStats,
        showBrandStats,
        clearFilters,
        changePage,
        trackCustomer,
        getRecords,
        changePageRecords,
        createSupplier,
        getSupplier,
        setEditSupplier,
        editSupplier,
        deleteSupplier,
        changePageSupplier,
        getCustomerReceipt,
        showAppliances,
        showSupplier
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
