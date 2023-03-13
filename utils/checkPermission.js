import { UnAuthenticatedError } from "../errors/index.js";

const checkPermission = (requestAdmin, resourceAdminId) => {
  if (requestAdmin.id === resourceAdminId.toString()) return;

  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermission;
