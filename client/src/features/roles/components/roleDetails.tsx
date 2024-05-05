import React from "react";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import Course from "../../../network/models/Course";

interface RoleDetailsProps {
  course: Course | null;
}

const RoleDetails: React.FC<RoleDetailsProps> = (props) => {
  const { course } = props;

  const exportToCategoryItem = (
    course: Course
  ): DescriptionsProps["items"] => {
    return (
      Object.entries(course)
        //.filter(([key, value]) => key !== "_id" && key !== "__v") -> gelen model içerisinden göstermek istemedğiniz alan var ise, kullanabilirsiniz.
        .map(([key, value]) => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          children: value,
        }))
    );
  };
    function exportToCourseItem(arg0: Course): import("antd/es/descriptions").DescriptionsItemType[] | undefined {
        throw new Error("Function not implemented.");
    }

  return (
    <>
      {course && (
        <Descriptions
          labelStyle={{ width: "200px" }}
          size="middle"
          style={{ marginTop: "20px" }}
          bordered
          column={1}
          items={exportToCourseItem(course!)}
        />
      )}
    </>
  );
};

export default RoleDetails;