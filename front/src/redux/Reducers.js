

// Auth Reducers
import Login from "./Login/Reducer";
import Register from "./Register/Reducer";
// import ChangePassword from "./ChangePassword/Reducer";

import Jobs from "./Jobs/Reducer"
import Purposal from "./Purposal/Reducer"
import Wallet from "./Wallet/Reducer"
import Employer from "./Employer/Reducer"
import Reset from "./ResetPassword/Reducer"






// import MainLayout from "./MainLayout/Reducer";

export default {
  // Common Reducers
  Jobs,
  // MainLayout,
  // PropertyEdit,
  // Auth Reducers
  Login,
  Register,
  Purposal,
  Wallet,
  Employer,
  Reset
  // ChangePassword,
}