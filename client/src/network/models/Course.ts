import { IBaseEntity } from "./core/IBaseEntity";

interface Course extends IBaseEntity {
  courseName: string;
  description?: string;
  createdDate?: Date;
  level?:string;
  lessonCount?:number;
  image?:string;

}
export default Course;
