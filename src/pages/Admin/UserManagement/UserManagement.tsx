import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  editUser,
  getUserApi,
  UserModel,
} from "../../../redux/UserReducer/UserReducer";
import { DispatchType, RootState } from "../../../redux/configStore";
import Upload from "antd/es/upload/Upload";
import {
  setEditAction,
  setModalAction,
} from "../../../redux/ModalReducer/ModalReducer";
import Modaltest from "../../../HOC/Modaltest";
import { signUpApi } from "../../../redux/SignUpReducer/SignUpReducer";
import { useNavigate, useParams } from "react-router-dom";
import { getStoreJSON } from "../../../utils/setting";
import EditUser from "./EditUser";
import "src/assets/css/Sidebar.css";
import Upload_Image from "../UploadImage/Upload_Image";
import AddUser from "../AddUser/AddUser";
let timeout: ReturnType<typeof setTimeout>;
const UserManagement: React.FC = () => {
  const user: UserModel[] = useSelector(
    (state: RootState) => state.UserReducer.arrUser
  );

  interface DataType {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar?: string;
    gender: boolean;
    role: string;
  }
  const data: DataType[] = user;
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userLogin = getStoreJSON("userLogin");
  const [form] = Form.useForm();

  // -------------- Edit User ---------
  const handleEdit = (id: number) => {
    const actionEditReduce = editUser(id);
    const actionEditComponent = setEditAction({
      Component: EditUser,
      title: "Edit Personal Information",
      ID: id,
    });
    dispatch(actionEditComponent);
    dispatch(actionEditReduce);
  };

  const handleAdd = () => {
    const actionAddComponent = setModalAction({
      Component: AddUser,
      title: "Add New User",
    });
    dispatch(actionAddComponent);
  };

  const handleUploadAvatar = (id: number) => {
    const actionUploadComponent = setModalAction({
      Component: Upload_Image,
      title: "Upload User Avatar",
      ID: id,
    });
    dispatch(actionUploadComponent);
  };

  const getAllUserApi = () => {
    // Goi api va dua du lieu len redux
    const actionAsync = getUserApi();
    dispatch(actionAsync);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder='Search'
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type='primary'
              size='small'>
              Search
            </Button>
            <Button onClick={() => {}} danger>
              Clear
            </Button>
          </>
        );
      },

      filterIcon: () => {
        return <SearchOutlined className='text-xl' />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLocaleString());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    // },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: any, user: UserModel) => {
        return user?.avatar !== null ? (
          <img
            src={user?.avatar}
            alt='...'
            style={{ height: "50px", width: "50px", borderRadius: "5px" }}
          />
        ) : (
          <Button
            type='primary'
            style={{ background: "rgb(240, 189, 199)", width: "auto" }}
            data-bs-toggle='modal'
            data-bs-target='#modalId'
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              handleUploadAvatar(user?.id);
            }}>
            Upload ảnh
          </Button>
        );
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => {
        if (text) text = "Male";
        else {
          text = "Female";
        }
        return <a>{text}</a>;
      },
    },
    {
      title: "Type",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        let color = text.length > 4 ? "red" : "green";
        if (text !== "ADMIN" && text !== "USER") {
          color = "blue";
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: <SettingOutlined className='text-2xl' />,
      key: "action",
      render: (_: any, record: DataType) => {
        return data.length >= 1 ? (
          <Space>
            <Popconfirm
              title='Bạn có muốn xóa ? '
              onConfirm={() => {
                dispatch(deleteUser(record?.id));
                // Load lại ds ng dùng
                getAllUserApi();
              }}>
              <Button type='primary' danger>
                Xóa
              </Button>
            </Popconfirm>
            <button
              className='btn btn-outline-warning btn-sm rounded-5 mx-1'
              data-bs-toggle='modal'
              data-bs-target='#modalId'
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                handleEdit(record?.id);
              }}>
              Sửa <i className='far fa-edit'></i>
            </button>
          </Space>
        ) : (
          ""
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    // Call api
    getAllUserApi();
    setLoading(false);
  }, []);

  return (
    <div>
      <Modaltest />
      <h1 className='text-4xl text-center'>Quản lý người dùng</h1>
      {/* Add user */}
      <div className='addAdminPage mb-3' style={{ cursor: "pointer" }}>
        <Button
          className='text-xl'
          type='primary'
          data-bs-toggle='modal'
          data-bs-target='#modalId'
          onClick={handleAdd}>
          <i className='fa fa-user-plus mr-2'></i>
          Thêm người dùng
        </Button>
      </div>
      <Form form={form} component={false}>
        <Table loading={loading} bordered columns={columns} dataSource={data} />
      </Form>
    </div>
  );
};

export default UserManagement;
