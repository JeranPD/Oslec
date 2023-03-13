import Admin from "../models/Admin.js ";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const adminAlreadyExist = await Admin.findOne({ email });
  if (adminAlreadyExist) {
    throw new BadRequestError("Email Already exist");
  }

  const admin = await Admin.create({ name, email, password });
  const token = admin.createJWT();
  res.status(StatusCodes.CREATED).json({
    admin: {
      email: admin.email,
      lastName: admin.lastName,
      location: admin.location,
      name: admin.name,
    },
    token,
    location: admin.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  

  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = admin.createJWT();
  admin.password = undefined;
  res.status(StatusCodes.OK).json({ admin, token, location: admin.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const admin = await Admin.findOne({ _id: req.admin.id });
  admin.email = email;
  admin.name = name;
  admin.lastName = lastName;
  admin.location = location;

  await admin.save();

  const token = admin.createJWT();

  res.status(StatusCodes.OK).json({ admin, token, location: admin.location });
};

export { register, login, updateUser };
