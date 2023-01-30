import React, { useEffect, useState } from "react";
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
import Upload_Image from "./UploadImage";
import {
  setEditAction,
  setModalAction,
} from "../../../redux/ModalReducer/ModalReducer";
import Modaltest from "../../../HOC/Modaltest";
import { signUpApi } from "../../../redux/SignUpReducer/SignUpReducer";
import { useNavigate } from "react-router-dom";
import { getStoreJSON } from "../../../utils/setting";
import EditUser from "./EditUser";
let timeout: ReturnType<typeof setTimeout>;
const UserManagement: React.FC = () => {
  const user: UserModel[] = useSelector(
    (state: RootState) => state.UserReducer.arrUser
  );
  console.log(user);

  interface DataType {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar: string;
    gender: boolean;
    role: string;
  }
  const data: DataType[] = user;
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userLogin = getStoreJSON("userLogin");
  const [form] = Form.useForm();

  // ----------------------- Edit User ------------------
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
  // -----------------------  ------------------

  // ------------- Modal upload ảnh -------
  const [isModalUpload, setIsModalUpload] = useState(false);
  const showModalUpload = () => {
    setIsModalUpload(true);
  };
  const handleOkUpload = () => {
    setIsModalUpload(false);
  };
  const handleCancelUpload = () => {
    setIsModalUpload(false);
  };
  const normFile = (e: DataType) => {
    console.log("Upload event:", e);
    if (Array.isArray(e.id)) {
      return e;
    }
    return e?.id;
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const handleUploadAvatar = (id: number) => {
    const actionUploadComponent = setModalAction({
      Component: Upload_Image,
      title: "Upload User Avatar",
    });
    dispatch(actionUploadComponent);
    console.log(id);
  };

  const onFinishUpload = (value: any) => {
    console.log(value);
  };
  //----------------------------------

  const getAllUserApi = () => {
    // Goi api va dua du lieu len redux
    const actionAsync = getUserApi();
    dispatch(actionAsync);
  };

  useEffect(() => {
    setLoading(true);
    // Call api
    getAllUserApi();
    setLoading(false);
  }, []);

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
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
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
            onClick={showModalUpload}
            type='primary'
            style={{ background: "rgb(240, 189, 199)", width: "auto" }}>
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
                dispatch(getUserApi());
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

  return (
    <div>
      <Modaltest />
      <h1 className='text-4xl text-center'>Quản lý người dùng</h1>

      <Form form={form} component={false}>
        <Table loading={loading} bordered columns={columns} dataSource={data} />
      </Form>

      {/* Modal upload ảnh */}
      <Modal
        title='Upload ảnh'
        open={isModalUpload}
        onOk={handleOkUpload}
        onCancel={handleCancelUpload}>
        <Form
          name='validate_other'
          {...formItemLayout}
          onFinish={onFinishUpload}
          initialValues={{
            "input-number": 3,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
          }}
          style={{ maxWidth: 600 }}>
          <Form.Item
            name='upload'
            label='Upload'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            extra=''>
            <Upload name='logo' action='/upload.do' listType='picture'>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
