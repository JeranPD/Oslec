import express from "express";
const router = express.Router();

import {
    addNewSupplier,
    getAllSupplier,
    updateSupplier,
    deleteSupplier,
    getDateSupplier
} from "../controllers/SupplierController.js";

router.route("/").post(addNewSupplier).get(getAllSupplier);

router.route("/sales").get(getDateSupplier);

router.route("/:id").delete(deleteSupplier).patch(updateSupplier);

  
export default router;
// router.get("/sales", async (req, res, next) => {
//   try {
//     const { dTo, dFrom, dGte, productStatus, id } = req.query;
//     // Status are one of pending, ongoing and completed
//     const lDate = await getDateSupplier({ dTo, dFrom, dGte, productStatus, id });

//     const groupedData = lDate.reduce((acc, curr) => {
//       if (!acc[curr.date]) {
//         acc[curr.date] = {
//           date: curr.date,
//           priced: curr.priced,
//           count: 1,
//           productOrder: {},
//         };
        
//       } else {
//         acc[curr.date].priced += curr.priced;
//         acc[curr.date].count++;
//       }

//       if (!acc[curr.date].productOrder[curr.productOrder]) {
//         acc[curr.date].productOrder[curr.productOrder] = 1;
//       } else {
//         acc[curr.date].productOrder[curr.productOrder]++;
//       }
//       return acc;
//     }, {});

//     const finalData = Object.values(groupedData).map((dateData) => {
//       let maxBrand = "";
//       let maxBrandCount = 0;
//       for (let productOrder in dateData.productOrder) {
//         if (dateData.productOrder[productOrder] > maxBrandCount) {
//           maxBrand = productOrder;
//           maxBrandCount = dateData.productOrder[productOrder];
//         }
//       }
      
//       return {
//         date: dateData.date,
//         priced: dateData.priced,
//         count: dateData.count,
//         productOrder: maxBrand,
//       };
//     });
//     finalData.sort((a, b) => new Date(a.date) - new Date(b.date));
//     res.json(finalData);
//   } catch (err) {
//     console.log(rtt);
//   }
// });