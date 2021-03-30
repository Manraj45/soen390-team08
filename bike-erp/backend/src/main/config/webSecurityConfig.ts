import { Role } from "../models/Account";

//Add the path of the endpoints and the roles allowed to access them. Do not add a path if all roles can access that endpoint
export const pathAutorization = {
  "/auth/test": [Role.ADMIN, Role.CUSTOMER],
  "/account_management/admin/update": [Role.ADMIN],
  "/account_management/admin/accounts": [Role.ADMIN],
  "/components/orderComponents": [Role.ADMIN, Role.MANAGER, Role.EMPLOYEE],
  "/finance/accountPayables/report": [Role.ADMIN, Role.MANAGER],
  "/finance/accountReceivables/report": [Role.ADMIN, Role.MANAGER]
};

//Function to verify if the user role is allowed or not to access a endpoint
export const authorizeRequest = (path: string, role: Role) => {
  if (
    pathAutorization[path] === undefined ||
    pathAutorization[path].includes(Role[role])
  ) {
    return true;
  } else {
    return false;
  }
};
