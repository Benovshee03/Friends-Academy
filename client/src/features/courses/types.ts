import Course from "../../network/models/Course";

export interface CourseState {
  list: Course[] | any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selected: Course | null;
}
export interface CourseType {
  key: string;
  _id: string;
  courseName: string;
  description: string;
  delete:string;
  level:string;
  lessonCount:number;
  image:string;
}


