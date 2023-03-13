import Supplier from "../models/Supplier.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermission from "../utils/checkPermission.js";
import moment from "moment";

const addNewSupplier = async (req, res) => {
    const {
        companyName,
        name,
        Address,
        contact,
        productOrder,
        quantity,
        productStatus,
      } = req.body;
    
      if (
        !companyName ||
        !name ||
        !Address ||
        !contact ||
        !productOrder ||
        !quantity ||
        !productStatus
      ) {
        throw new BadRequestError("Please provide all values");
      }
      req.body.createdBy = req.admin.id;
      const supplier = await Supplier.create(req.body);
      res.status(StatusCodes.CREATED).json({ supplier });
}

const getAllSupplier = async (req, res) => {
    const { searchSupplier, productStatus, sortSupplier } = req.query;
    const queryObject = {
        createdBy: req.admin.id,
    };

    if (productStatus && productStatus !== "all") {
        queryObject.productStatus = productStatus;
    }

    if (searchSupplier) {
        queryObject.companyName = { $regex: searchSupplier, $options: "i" };
    }

    let result = Supplier.find(queryObject);

    

    if (sortSupplier === "latest") {
        result = result.sort("-createdAt");
    }

    if (sortSupplier === "oldest") {
        result = result.sort("createdAt");
    }

    if (sortSupplier === "a-z") {
        result = result.sort("-companyName");
    }

    if (sortSupplier === "z-a") {
        result = result.sort("companyName");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    
    const suppliers = await result;

    const totalSupplier = await Supplier.countDocuments(queryObject);
    const numofSupplierPages = Math.ceil(totalSupplier / limit);

    res.status(StatusCodes.OK).json({ suppliers, totalSupplier, numofSupplierPages });
}

const updateSupplier = async (req, res) => {
    const { id: supplierId } = req.params;
    const {
        companyName,
        name,
        Address,
        contact,
        productOrder,
        quantity,
        productStatus,
    } = req.body;

    if (
        !companyName ||
        !name ||
        !Address ||
        !contact ||
        !productOrder ||
        !quantity ||
        !productStatus
    ) {
        throw new BadRequestError("Please provide all values");
    }

    const supplier = await Supplier.findOne({ _id: supplierId });

    if (!supplier) {
        throw new NotFoundError(`No Supplier with id : ${supplierId}`);
    }

    checkPermission(req.admin, supplier.createdBy);

    const updateSupplier = await Supplier.findOneAndUpdate(
        {
        _id: supplierId,
        },
        req.body,
        { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ updateSupplier });
}

const deleteSupplier = async (req, res) => {
    const { id: supplierid } = req.params;

    const supplier = await Supplier.findOne({ _id: supplierid });

    if (!supplier) {
        throw new NotFoundError(`No supplier with id : ${supplierid}`);
    }

    checkPermission(req.admin, supplier.createdBy);

    await supplier.remove();
    res.status(StatusCodes.OK).json({ message: "Supplier deleted successfully" });
}

const getDateSupplier = async (req, res) => {
  const queryObject = {
    createdBy: req.admin.id,
  };
  let allRecords = await Supplier.find(queryObject)

  const supplierData = allRecords.map((record) => {
    return {
      // quantity: record.quantity,
      // pricedPerUnit: record.pricedPerUnit,
      totalPrice: Number(record.quantity) * Number(record.pricedPerUnit),
      createdAt: moment(record.createdAt).format("YYYY-MM-DD")
    }
  })

const results = {};

  supplierData.forEach(data => {
    const monthYear = data.createdAt.substr(0, 7);
    results[monthYear] = results[monthYear] || {};
    results[monthYear][data.totalPrice] = data.totalPrice;
  });
  const supplierFinalData = [];
  for (const monthYear in results) {
    const appliancesForMonth = supplierData.filter(data => data.createdAt.startsWith(monthYear));
    console.log(appliancesForMonth[0])
    let monthlyCost = 0;
    for (const sup in results[monthYear]) {
      monthlyCost += results[monthYear][sup]
    }
    supplierFinalData.push({createdAt: appliancesForMonth[0].createdAt, price: monthlyCost})
  }

  res.status(StatusCodes.OK).json({ supplierFinalData });
};

export {
    addNewSupplier,
    getAllSupplier,
    updateSupplier,
    deleteSupplier,
    getDateSupplier
  };

  // const getDateSupplier = async ({ dTo, dFrom, dGte, productStatus, id }) => {
  //   try {
  //     if (dTo && dFrom) {
  //       const inputTo = new Date(dTo);
  //       const inputFrom = new Date(dFrom);
  //       const inputID = id;
  //       const retrieveData = await Supplier.find(
  //         {
  //           createdAt: {
  //             $gte: inputFrom.setDate(inputFrom.getDate() + 1),
  //             $lt: inputTo.setDate(inputTo.getDate() + 1),
  //           },
  //           productStatus: productStatus,
  //           createdBy: inputID
  //         },
  //         {
  //           priced: 1,
  //           updatedAt: 1,
  //           productOrder: 1,
  //         }
  //       );
        
  //       return retrieveData.map((e) => {
  //         const date = moment(e.updatedAt).format("MMMM YYYY");
  //         const dataRet = { date, priced: Number(e.quantity) * Number(e.pricedPerUnit), productOrder: e.productOrder };
  //         return dataRet;
  //       });
  //     }
  
  //     if (dGte) {
  //       const inputExact = new Date(dGte);
  //       const retrieveData = await Supplier.find({
  //         createdAt: { $gte: inputExact.setDate(inputExact.getDate() + 1) },
  //         productStatus: productStatus,
  //       });
  //       return retrieveData.map((e) => {
  //         const date = moment(e.updatedAt).format("MMMM YYYY");
  //         const dataRet = { date, priced: Number(e.quantity) * Number(e.pricedPerUnit), productOrder: e.productOrder };
  //         return dataRet;
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };