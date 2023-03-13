import express from "express";
const router = express.Router();

import {
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

} from "../controllers/customerController.js";

router.route("/").post(addNewCustomer).get(getAllCustomer);

router.get("/sales", async (req, res, next) => {
  try {
    const { dTo, dFrom, dGte, status, id } = req.query;
    // Status are one of pending, ongoing and completed
    const lDate = await getDate({ dTo, dFrom, dGte, status, id });

    const groupedData = lDate.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = {
          date: curr.date,
          price: curr.price,
          count: 1,
          appliancesType: {},
        };
      } else {
        acc[curr.date].price += curr.price;
        acc[curr.date].count++;
      }

      if (!acc[curr.date].appliancesType[curr.appliancesType]) {
        acc[curr.date].appliancesType[curr.appliancesType] = 1;
      } else {
        acc[curr.date].appliancesType[curr.appliancesType]++;
      }
      return acc;
    }, {});

    const finalData = Object.values(groupedData).map((dateData) => {
      let maxBrand = "";
      let maxBrandCount = 0;
      for (let appliancesType in dateData.appliancesType) {
        if (dateData.appliancesType[appliancesType] > maxBrandCount) {
          maxBrand = appliancesType;
          maxBrandCount = dateData.appliancesType[appliancesType];
        }
      }
      return {
        date: dateData.date,
        price: dateData.price,
        count: dateData.count,
        appliancesType: maxBrand,
      };
    });
    finalData.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(finalData);
  } catch (err) {
    console.log(rtt);
  }
});



router.get("/info", async (req, res, next) => {
  try {
    const { dFrom, dTo, productStatus, id } = req.query;
    const infoResponse = await getInfo({ dFrom, dTo, productStatus, id });
    res.json(infoResponse);
  } catch (err) {
    console.log(err);
  }
});

router.get("/info1", async (req, res, next) => {
  try {
    const { dFrom, dTo, status, id } = req.query;
    const infoResponse1 = await getInfo1({ dFrom, dTo, status, id });
    res.json(infoResponse1);
  } catch (err) {
    console.log(err);
  }
});
router.route("/appliances").get(getDateAppliances);
router.route("/customerReceipt").get(getCustomerReceipt);
router.route("/records").get(getRecords);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteCustomer).patch(updateCustomer);

export default router;
