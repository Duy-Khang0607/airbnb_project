import React, { useEffect, useState } from "react";
import avatar from "src/assets/imgs/avatarwhite.jpg";
import { fetchProfileApi } from "src/redux/Profile/ProfileSlice";
import { USER_LOGIN, getStoreJSON } from "src/utils/setting";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "src/redux/configStore";
import "src/assets/css/profileUser.css";
import ModalHOC from "src/HOC/ModalHOC";
import UpdateInforUser from "./UpdateInforUser";
import moment from "moment";
import {
  RentedRoom,
  getRentedRoomByEachUser,
} from "src/redux/UserReducer/UserReducer";
import data from "./data";
import { getAllRoomsApi } from "src/redux/RoomReducer/RoomReducer";
type Props = {};

export default function Profile({}: Props) {
  const { arrRooms } = useSelector((state: RootState) => state.RoomReducer);
  // const userLogin = getStoreJSON("userLogin");
  const { rentedRoom, userInfo } = useSelector(
    (state: RootState) => state.UserReducer
  );
  const { userLogin } = useSelector((state: RootState) => state.SignInReducer);
  const [rentedRoomList, setRentedRoomList] = useState<RentedRoom[]>(
    rentedRoom as RentedRoom[]
  );

  const dispatch: DispatchType = useDispatch();

  // const dispatch = useDispatch();
  const avatarDefault = require("src/assets/imgs/avatarwhite.jpg");

  useEffect(() => {
    dispatch(getAllRoomsApi());
    getRentedRoom();
    setRentedRoomList(rentedRoom as RentedRoom[]);
  }, [rentedRoom]);

  const getRentedRoom = async () => {
    try {
      const action = getRentedRoomByEachUser(userInfo.id || userLogin.user.id);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const description =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur ipsam iure et odio quos consequatur sint fugiat ratione, dolorem nostrum, ipsum, totam corporis voluptates quia libero possimus quis temporibus aspernatur!";
  const [readMore, setReadMore] = useState<boolean>(false);
  const [nodeOfElement, setNodeOfElement] = useState<number>(2);
  const slice = data.dataTest.slice(0, nodeOfElement);
  const toggleBtn = () => {
    setReadMore((prevState) => !prevState);
  };
  const loadMore = () => {
    if (nodeOfElement <= data.dataTest.length) {
      setNodeOfElement(nodeOfElement + nodeOfElement);
    } else {
      setNodeOfElement(2);
    }
  };
  return (
    <div className='container'>
      <div className='profile m-0 py-28'>
        <div className='row'>
          <div className='col-lg-4 col-md-12 col-sm-12 left-profile'>
            <div className='infor-user mx-5'>
              <div className='card'>
                <div className='card-header text-center'>
                  {userLogin.user.avatar ? (
                    <img
                      src={userLogin.user.avatar}
                      className='rounded-circle object-cover'
                      alt='...'
                      style={{ width: "120px", height: "131px" }}
                    />
                  ) : (
                    <img
                      src={avatarDefault}
                      className='rounded-circle object-cover'
                      alt='...'
                      style={{ width: "120px", height: "131px" }}
                    />
                  )}

                  <hr />
                  <p className='mx-3'>
                    <button className='btn btn-light border-gray-400'>
                      Update avatar
                    </button>
                  </p>
                </div>
                <div className='card-body'>
                  <div className='card-title'>
                    <i className='fas fa-user-check'></i>
                    <span className='mx-2 '>
                      {userInfo.name || userLogin.user.name}
                    </span>
                  </div>
                </div>
                <div className='border-top-0 card-footer'>
                  <div className='user-confirm'>
                    <h5 className='mt-2'>User Comfirmed</h5>
                    <ul>
                      <li>
                        <i className='far fa-envelope'></i>
                        <span className='mx-2'>
                          {userInfo.email || userLogin.user.email}
                        </span>
                      </li>
                      <li>
                        <i className='fas fa-phone'></i>
                        <span className='mx-2'>
                          {userInfo.phone || userLogin.user.phone}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-8 col-md-12 col-sm-12'>
            <div className='right-profile'>
              <h3 className='user-name'>
                Hi, {userInfo.name || userLogin.user.name}
              </h3>
              <p className='date-join'>Joined in 2022</p>
              <h5
                className='edit-infor'
                data-bs-toggle='modal'
                data-bs-target='#update'
                style={{ cursor: "pointer" }}>
                <button className='btn btn-light border-2 shadow-lg shadow-cyan-400 border-cyan-300'>
                  Edit Profile
                </button>
              </h5>
              <ModalHOC
                modalId='update'
                title='Update Personal Information'
                content={<UpdateInforUser />}
              />
              <div className='rent-history mt-4'>
                <h5>Danh sách các phòng được đặt : </h5>
                {rentedRoomList.length > 0 && (
                  <div className='room-list'>
                    {rentedRoomList.map((item, index) => {
                      arrRooms.map((room) => {
                        if (item.maPhong == room.id) {
                          item = {
                            ...item,
                            hinhAnh: room.hinhAnh,
                            tenPhong: room.tenPhong,
                            giaTien: room.giaTien,
                            dieuHoa: room.dieuHoa,
                            mayGiat: room.mayGiat,
                            banLa: room.banLa,
                            tivi: room.tivi,
                            wifi: room.wifi,
                            phongNgu: room.phongNgu,
                            phongTam: room.phongTam,
                          };
                        }
                      });
                      return (
                        <div
                          className='card my-4 border-0 rounded-0 border-bottom'
                          key={item.id}>
                          <div className='row g-0'>
                            <div className='col-md-5 left-card'>
                              <img
                                src={item.hinhAnh}
                                className='img-fluid rounded-4 w-100'
                                alt='...'
                                style={{ height: "205px" }}
                              />
                            </div>
                            <div className='col-md-7 right-card'>
                              <div className='card border-0'>
                                <div className='card-header border-0'>
                                  <p>Room Number: {item.maPhong}</p>
                                  <h5>{item.tenPhong}</h5>
                                  <div className='border-bottom pt-2 under-line' />
                                </div>
                                <div className='card-body border-0'>
                                  <p className='my-2'>
                                    {item.soLuongKhach} Guests - Studio Room -
                                    {item.phongNgu} bed - {item.phongTam} bath
                                  </p>
                                  <p>
                                    {item.wifi} - Kitchen - Air Condition -
                                    Washing Machine
                                  </p>
                                </div>
                                <div className='card-footer text-end border-0'>
                                  <p className='mt-2'>{item.giaTien} $/Night</p>
                                  <p className='mt-2'>
                                    Check in:{" "}
                                    {moment(item.ngayDen).format(
                                      "hh:mm A, dddd ,DD/MM/YYYY"
                                    )}
                                  </p>
                                  <p className='mt-2'>
                                    Check out:{" "}
                                    {moment(item.ngayDi).format(
                                      "hh:mm A, dddd ,DD/MM/YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {rentedRoomList.length === 0 && (
                  <div className='m-3'>
                    <p>Opps! You are not booked a room yet. </p>
                  </div>
                )}
                <button
                  className='btn btn-danger d-block w-100 btnLoad'
                  onClick={() => loadMore()}>
                  {nodeOfElement <= data.dataTest.length
                    ? "Load More"
                    : "Load Less"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
