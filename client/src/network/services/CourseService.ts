import Course from "../models/Course";
import { BaseService } from "./core/BaseService";
export class CourseService extends BaseService<Course>{
    constructor(){
        super("/courses")
    }
}