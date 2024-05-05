import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Row,
  Table,
  Col,
  Result,
  Button,
  Tooltip,
  TableProps,
  Dropdown,
  Space,
  Menu,
  Popconfirm,
} from "antd";
import { CourseType } from "./types";
import { UserAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteCourse,
  fetchCourses,
  fetchCourse,
  updateCourse,
} from "./courseSlice";
import {
  SearchOutlined,
  PlusOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Card from "antd/es/card/Card";
import CustomModal from "../../components/Modal";
import CourseDetail from "./components/courseDetail";
import FormComponent from "./components/formComponent";

const List: React.FC = () => {
  const [open, setOpen] = useState({
    open: false,
    content: "",
  });

  const dispatch = UserAppDispatch();
  const courses = useAppSelector((state) => state.course.list);
  const course = useAppSelector((state) => state.course.selected);
  

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const onDetailsHandle = useCallback(
    (e: boolean, id?: string) => {
      setOpen({
        open: e,
        content: "details",
      });
      if (id) {
        dispatch(fetchCourse(id));
      }
    },
    [dispatch]
  );

  const onDeleteHandle = useCallback(
    (e: any) => {
      dispatch(deleteCourse(e));
    },
    [dispatch]
  );

  const onEditHandle = useCallback(
    (e: boolean, id?: string) => {
      if (id) {
        dispatch(fetchCourse(id));
      }
      setOpen({
        open: e,
        content: "edit",
      });
    },
    [dispatch]
  );

  const onFinish = (values: any) => {
    dispatch(updateCourse(values));
    setOpen({ open: false, content: "" });
  };

  const onNavigateToCreate = () => navigate("/admin/courses/create");
  // const onNavigateToProducts = (id: string) =>
  //   navigate(`/admin/products/${id}`);

  type ColumnType = TableProps<CourseType>["columns"] | any;
  const columns: ColumnType = useMemo(
    () => [
      {
        title: "Course Name",
        dataIndex: "CourseName",
        key: `CourseName`,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: `description`,
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        key: `createdDate`,
      },
      {
        title: "Level",
        dataIndex: "level",
        key: `level`,
      },
      {
        title: "Lesson Count",
        dataIndex: "lessonCount",
        key: `lessonCount`,
      },
      {
        title: "Image",
        dataIndex: "image",
        key: `image`,
      },
      {
        title: "Actions",
        key: `actions`,
        dataIndex: "_id",
        render: (_: any) => {
          return (
            <Dropdown
              trigger={["click"]}
              dropdownRender={(menu) => (
                <div>
                  <Menu>
                    <Menu.Item
                      key={`edit_${_}`}
                      onClick={() => onEditHandle(true, _)}
                      icon={<EditOutlined />}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      key={`details_${_}`}
                      onClick={() => onDetailsHandle(true, _)}
                      icon={<SearchOutlined />}
                    >
                      Details
                    </Menu.Item>
                    <Menu.Item
                      key={`products_${_}`}
                      // onClick={() => onNavigateToProducts(_)}
                      icon={<UnorderedListOutlined />}
                    >
                      Products
                    </Menu.Item>

                    <Menu.Item
                      key={`delete_${_}`}
                      icon={<DeleteOutlined />}
                      danger
                    >
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDeleteHandle(_)}
                      >
                        Delete
                      </Popconfirm>
                    </Menu.Item>
                  </Menu>
                </div>
              )}
            >
              <Button size={"middle"}>
                <Space>
                  <SettingOutlined />
                </Space>
              </Button>
            </Dropdown>
          );
        },
      },
    ],
    []
  );
  console.log(courses);

  return (
    <>
      <Card>
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 0, offset: 0 }}
          >
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Pervin Nerdesin?</Button>}
            />
          </Col>
          <Col
            xs={{ span: 0, offset: 0 }}
            sm={{ span: 0, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
            style={{ marginBottom: 16 }}
          >
            <Tooltip title="Create">
              <Button
                onClick={onNavigateToCreate}
                style={{ float: "right" }}
                type="primary"
                icon={<PlusOutlined />}
                className="bg-primary"
              >
                New Course
              </Button>
            </Tooltip>
          </Col>
          <Col span={24}>
            <Table
              size="middle"
              locale={{
                emptyText: "There is no data",
                filterSearchPlaceholder: "Ara",
              }}
              columns={columns}
              dataSource={courses}
              
            />
          </Col>
        </Row>
      </Card>

      {open.content === "details" ? (
        <CustomModal
          title={`Course Details`}
          width={1200}
          open={open.open}
          onOpenHandler={onDetailsHandle}
          content={<CourseDetail course={course} />}
        />
      ) : (
        <CustomModal
          title={`Course Edit`}
          width={700}
          open={open.open}
          onOpenHandler={onEditHandle}
          content={
            <FormComponent onFinish={onFinish} initialValues={course} />
          }
        />
      )}
    </>
  );
};

export default List;