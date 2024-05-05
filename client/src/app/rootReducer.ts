import { combineReducers } from "@reduxjs/toolkit";
// import categorySlice from "../features/categories/categorySlice";
// import productSlice from "../features/products/productSlice";
import authSlice from "../features/auth/authSlice";
import roleSlice from "../features/roles/roleSlice";
import userSlice from "../features/users/userSlice";
import courseSlice from "../features/courses/courseSlice";
const rootReducer = combineReducers({
  // category: categorySlice,
//   product: productSlice,
  auth: authSlice,
  users: userSlice,
  roles:roleSlice,
  course:courseSlice,
});

export default rootReducer;