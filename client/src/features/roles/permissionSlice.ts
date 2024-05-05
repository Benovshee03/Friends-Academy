import { createAsyncThunk } from "@reduxjs/toolkit";
import createBaseSlice from "../../network/reducers/core/BaseSlice";
import { PermissionService } from "../../network/services/PermissionService";
import { PermissionState } from "./types";

const initialState: PermissionState = {
  list: [],
  status: "idle",
  error: null,
  selected: null,
};

let permissionService = new PermissionService();

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async () => {
    const response = await permissionService.getAll();
    return response.data;
  }
);

const permissionSlice = createBaseSlice<PermissionState>(
  "permission",
  initialState,
  [
    {
      thunk: fetchPermissions,
      onFulfilled: (state, action) => { 
        state.list = action.payload; 
      },
    },
  ]
);

export default permissionSlice.reducer;