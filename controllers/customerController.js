import AddCustomer from "../models/AddCustomer.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermission from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";

const addNewCustomer = async (req, res) => {
  const {
    lastName,
    firstName,
    product,
    serialNumber,
    brand,
    fixingparts,
    address,
  } = req.body;

  if (
    !lastName ||
    !firstName ||
    !product ||
    !serialNumber ||
    !brand ||
    !fixingparts ||
    !address
  ) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.admin.id;
  const customer = await AddCustomer.create(req.body);
  res.status(StatusCodes.CREATED).json({ customer });
};

const getAllCustomer = async (req, res) => {
  const { searchAllLastName, searchAllFirstName, search, status, sort } = req.query;
  const queryObject = {
    createdBy: req.admin.id,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (search) {
    queryObject.trackingNumber = { $regex: search, $options: "i" };
  }
  if (searchAllLastName) {
    queryObject.lastName = { $regex: searchAllLastName, $options: "i" };
  }
  if (searchAllFirstName) {
    queryObject.firstName = { $regex: searchAllFirstName, $options: "i" };
  }

  let result = AddCustomer.find(queryObject);

  

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  if (sort === "a-z") {
    result = result.sort("lastName");
  }

  if (sort === "z-a") {
    result = result.sort("-lastName");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  
  const customers = await result;

  const totalCustomer = await AddCustomer.countDocuments(queryObject);
  const numofPages = Math.ceil(totalCustomer / limit);

  res.status(StatusCodes.OK).json({ customers, totalCustomer, numofPages });
};

const updateCustomer = async (req, res) => {
  const { id: customerId } = req.params;
  
  const {
    lastName,
    firstName,
    serialNumber,
    product,
    brand,
    fixingparts,
    address,
  } = req.body;

  if (
    !lastName ||
    !firstName ||
    !product ||
    !serialNumber ||
    !brand ||
    !fixingparts ||
    !address
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const customer = await AddCustomer.findOne({ _id: customerId });

  if (!customer) {
    throw new NotFoundError(`No customer with id : ${customerId}`);
  }


  checkPermission(req.admin, customer.createdBy);

  const updateCustomer = await AddCustomer.findOneAndUpdate(
    {
      _id: customerId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updateCustomer });
};

const deleteCustomer = async (req, res) => {
  const { id: customerId } = req.params;

  const customer = await AddCustomer.findOne({ _id: customerId });

  if (!customer) {
    throw new NotFoundError(`No customer with id : ${customerId}`);
  }

  checkPermission(req.admin, customer.createdBy);

  await customer.remove();
  res.status(StatusCodes.OK).json({ message: "Customer deleted successfully" });
};

const showStats = async (req, res) => {
  // Customer Status
  let stats = await AddCustomer.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.admin.id) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, item) => {
    const { _id: title, count } = item;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    ongoing: stats.ongoing || 0,
    completed: stats.completed || 0,
  };

  // Brand Status
  let brandStats = await AddCustomer.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.admin.id) } },
    { $group: { _id: "$brand", count: { $sum: 1 } } },
  ]);

  brandStats = brandStats.reduce((acc, item) => {
    const { _id: title, count } = item;
    acc[title] = count;
    return acc;
  }, {});

  const brandDefaultStats = {
    LG: brandStats.LG || 0,
    HTC: brandStats.HTC || 0,
    SONY: brandStats.SONY || 0,
    SAMSUNG: brandStats.SAMSUNG || 0,
    HISENSE: brandStats.HISENSE || 0,
    ACER: brandStats.ACER || 0,
    DELL: brandStats.DELL || 0,
    HP: brandStats.HP || 0,
    LENOVO: brandStats.LENOVO || 0,
    ASUS: brandStats.ASUS || 0,
    REALME: brandStats.REALME || 0,
  };

  // Monthly Income
  let monthlyIncome = await AddCustomer.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.admin.id) } },
    {
      $group: {
        _id: {
          status: "$status",
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        total: { $sum: "$price" },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);
 

  monthlyIncome = monthlyIncome.filter((completeItem) => {
    const {
      _id: { status, year, month },
    } = completeItem;

    if (status === "completed") {
      return completeItem;
    }
  });
  const monthlytStats = {
    latest: monthlyIncome[0].total,
  };

  monthlyIncome = monthlyIncome
    .map((item) => {
      const {
        _id: { year, month },
        total,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, total };
    })
    .reverse();

  // Monthly Applications
  let monthlyApplications = await AddCustomer.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.admin.id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  // Monthly Brand
  let monthlyBrand = await AddCustomer.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.admin.id) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          name: "$brand",
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 10 },
  ]);


  monthlyBrand = monthlyBrand
    .map((item) => {
      const {
        _id: { year, month, name },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      const brandName = `${date}\n ${name}`;
      return { brandName, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyIncome,
    monthlytStats,
    brandDefaultStats,
    monthlyApplications,
    monthlyBrand,
  });
};

const getDate = async ({ dTo, dFrom, dGte, status, id }) => {
  try {
    if (dTo && dFrom) {
      const inputTo = new Date(dTo);
      const inputFrom = new Date(dFrom);
      const inputID = id;
      const retrieveData = await AddCustomer.find(
        {
          createdAt: {
            $gte: inputFrom.setDate(inputFrom.getDate() + 1),
            $lt: inputTo.setDate(inputTo.getDate() + 1),
          },
          status: status,
          createdBy: inputID
        },
        {
          price: 1,
          updatedAt: 1,
          appliancesType: 1,
        }
      );
      return retrieveData.map((e) => {
        const date = moment(e.updatedAt).format("MMMM YYYY");
        const dataRet = { date, price: e.price, appliancesType: e.appliancesType };
        return dataRet;
      });
    }

    if (dGte) {
      const inputExact = new Date(dGte);
      const retrieveData = await AddCustomer.find({
        createdAt: { $gte: inputExact.setDate(inputExact.getDate() + 1) },
        status: status,
      });
      return retrieveData.map((e) => {
        const date = moment(e.updatedAt).format("MMMM YYYY");
        const dataRet = { date, price: e.price, appliancesType: e.appliancesType };
        return dataRet;
      });
    }
  } catch (err) {
    console.log(err);
  }
};



const getDateAppliances = async (req, res) => {
  const queryObject = {
    createdBy: req.admin.id,
  };
  let allRecords = await AddCustomer.find(queryObject)


  const appliancesData = allRecords.map((record) => {
    return {
      appliancesType: record.appliancesType,
      createdAt: moment(record.createdAt).format("YYYY-MM-DD")
    }
  })

  const results = {};

  appliancesData.forEach(appliance => {
    const monthYear = appliance.createdAt.substr(0, 7);
    results[monthYear] = results[monthYear] || {};
    results[monthYear][appliance.appliancesType] = (results[monthYear][appliance.appliancesType] || 0) + 1;
  });

  const appliances = [];

  for (const monthYear in results) {
    const appliancesForMonth = appliancesData.filter(appliance => appliance.createdAt.startsWith(monthYear));
    console.log(appliancesForMonth)
    let maxCount = 0;
    let maxAppliancesType = null;
    for (const appliancesType in results[monthYear]) {
      const count = results[monthYear][appliancesType];
      if (count > maxCount) {
        maxCount = count;
        maxAppliancesType = appliancesType;
      }
    }
    const resultForMonth = appliancesForMonth.find(appliance => appliance.appliancesType === maxAppliancesType);
    // console.log(resultForMonth)
    if (resultForMonth) {
      resultForMonth.count = maxCount;
      appliances.push(resultForMonth);
    }
  }


  res.status(StatusCodes.OK).json({ appliances });
};

const getInfo = async ({ dFrom, dTo, status, id }) => {
  try {
   
    const inputFrom = new Date(dFrom);
    const inputTo = new Date(dTo);
    const inputID = id;
    const retrieveData = await AddCustomer.find({
      createdAt: {
        $gte: inputFrom.setDate(inputFrom.getDate() + 1),
        $lt: inputTo.setDate(inputTo.getDate() + 1),
      },
      status: status,
      createdBy: inputID
    });
    return retrieveData ;
  } catch (err) {
    console.log(err);
  }
};

const getInfo1 = async ({ dFrom, dTo, id }) => {
  try {
    
    const inputFrom = new Date(dFrom);
    const inputTo = new Date(dTo);
    const inputID = id;
    const retrieveData2 = await AddCustomer.find({
      createdAt: {
        $gte: inputFrom.setDate(inputFrom.getDate() + 1),
        $lt: inputTo.setDate(inputTo.getDate() + 1),
      },
      createdBy: inputID
    });
    return retrieveData2 ;
  } catch (err) {
    console.log(err);
  }
};

const getRecords = async (req, res) => {
  const { searchLastName, searchFirstName, sort } = req.query;
  const queryObject = {
    createdBy: req.admin.id,
    status: 'completed',
  };

  if(searchLastName){
      queryObject.lastName = {$regex: searchLastName, $options: 'i'}                
  }
  if(searchFirstName){
    queryObject.firstName = {$regex: searchFirstName, $options: 'i'}                
  }

  let allRecords = AddCustomer.find(queryObject)

  //Sort records
  if (sort === "latest") {
    allRecords = allRecords.sort("-createdAt");
  }

  if (sort === "oldest") {
    allRecords = allRecords.sort("createdAt");
  }

  if (sort === "a-z") {
    allRecords = allRecords.sort("lastName");
  }

  if (sort === "z-a") {
    allRecords = allRecords.sort("-lastName");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  allRecords = allRecords.skip(skip).limit(limit);
  
  const records = await allRecords;
  

  const totalRecords = await AddCustomer.countDocuments(queryObject);
  const numofRecords = Math.ceil(totalRecords / limit);

  res.status(StatusCodes.OK).json({records, totalRecords, numofRecords});
};

const getCustomerReceipt = async (req, res) => {
  const { searchLastName, searchFirstName } = req.query;
  const queryObject = {
    createdBy: req.admin.id,
    status: "completed",
    paymentStatus: "paid",
  };

  
  if(searchLastName){
    queryObject.lastName = {$regex: searchLastName, $options: 'i'}                
  }
  if(searchFirstName){
    queryObject.firstName = {$regex: searchFirstName, $options: 'i'}                
  }

  let allRecords = AddCustomer.find(queryObject)
  
  const customerReceipt = await allRecords;

  res.status(StatusCodes.OK).json({customerReceipt});
};

export {
  addNewCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  showStats,
  getDate,
  getInfo,
  getInfo1,
  getRecords,
  getCustomerReceipt,
  getDateAppliances,

};
