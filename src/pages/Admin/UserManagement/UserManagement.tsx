import React, { useEffect, useState } from "react";
import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Form,
  Input,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUserApi,
  UserModel,
} from "../../../redux/UserReducer/UserReducer";
import { DispatchType, RootState } from "../../../redux/configStore";

const UserManagement: React.FC = () => {
  const dispatch: DispatchType = useDispatch();
  const user: UserModel[] = useSelector(
    (state: RootState) => state.UserReducer.arrUser
  );
  const [loading, setLoading] = useState(false);
  const [editRowKey, setEditRowKey] = useState("");
  const [form] = Form.useForm();
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

  interface DataType {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: null;
    birthday: string;
    avatar: null;
    gender: boolean;
    role: string;
    // tags: string[];
  }

  const isEditing = (record: any) => {
    return record.id === editRowKey;
  };

  const cancel = () => {};
  const save = () => {};
  const edit = (record: any) => {
    form.setFieldsValue({
      id: 0,
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
      ...record,
    });
    setEditRowKey(record.id);
  };

  const data: DataType[] = user;

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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text) => <a>{text}</a>,
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
        // if (text === "loser") {
        //   color = "volcano";
        // }
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
      render: (text, user) => {
        const editUser = isEditing(user);

        return data.length >= 1 ? (
          <Space>
            <Popconfirm
              title='Bạn có muốn xóa ? '
              onConfirm={() => {
                dispatch(deleteUser(user.id));
                dispatch(getUserApi());
              }}>
              <Button disabled={editUser} type='primary' danger>
                Xóa
              </Button>
            </Popconfirm>
            {editUser ? (
              <span>
                <Space size='middle'>
                  <Button onClick={() => console.log("first")} type='primary'>
                    Save
                  </Button>
                  <Popconfirm title='Bạn có muốn hủy ? ' onConfirm={cancel}>
                    <Button type='primary' danger>
                      Cancel
                    </Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <Button
                onClick={() => {
                  edit(user);
                }}
                type='primary'>
                Sửa
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  // const mergedColumns = columns.map((col)=>{
  //   if(!col.edit){
  //     return col;
  //   }
  // })

  type Props = {
    editing: string;
    dataIndex: string;
    title: string;
    record: string;
    children: string;
    restProps: string;
  };

  const EditableCell = (props: Props) => {
    const input = <Input />;
    return (
      <td>
        {props.editing ? (
          <Form.Item
            name={props.dataIndex}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập thông tin ${props.title}`,
              },
            ]}>
            {input}
          </Form.Item>
        ) : (
          props.children
        )}
      </td>
    );
  };

  return (
    <div>
      <h1 className='text-4xl'>Quản lý người dùng</h1>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          loading={loading}
          bordered
          columns={columns}
          dataSource={data}
        />
      </Form>
    </div>
  );
};

export default UserManagement;
