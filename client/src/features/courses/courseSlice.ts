import { createAsyncThunk } from "@reduxjs/toolkit";
import { CourseState } from "./types";
import { CourseService } from "../../network/services/CourseService";
import Course from "../../network/models/Course";
import createBaseSlice from "../../network/reducers/core/BaseSlice";

const initialState: CourseState = {
  list: [],
  status: "idle",
  error: null,
  selected: null,
};

let courseService = new CourseService();

export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course: Course) => {
    const response = await courseService.add(course);
    return response.data;
  }
);

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await courseService.getAll();
    return response.data;
    
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id: string) => {
    const response = await courseService.delete(id);
    return response.data;
  }
);

export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (id: string) => {
    const response = await courseService.get(id);
    return response.data;
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course: Course) => {
    const response = await courseService.update(course._id, course);
    return response.data;
  }
);

const courseSlice = createBaseSlice<CourseState>("course", initialState, [
  {
    thunk: fetchCourse,
    onFulfilled: (state, action) => {
      state.list = action.payload;
    },
  },
  {
    thunk: addCourse,
    onFulfilled: (state, action) => state.list.push(action.payload),
  },
  {
    thunk: deleteCourse,
    onFulfilled: (state, action) => {
      state.list = state.list.filter(
        (course) => course._id !== action.payload
      );
    },
  },
  {
    thunk: updateCourse,
    onFulfilled: (state, action) => {
      state.list = state.list.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    },
  },
]);

export default courseSlice.reducer;
 