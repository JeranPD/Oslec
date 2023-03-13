import AddCustomer from "../models/AddCustomer.js";

const trackStatus = async (req, res) => {
  AddCustomer.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
  // const data = await AddCustomer.findOne(req.body);
  // res.status(StatusCodes.OK).json({ data });
};

export { trackStatus };
