import { StarOutlined, TranslationOutlined } from "@ant-design/icons";
import { Alert, Col, DatePicker, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationByIdApi } from "src/redux/Home/LocationSlice";
import { DispatchType, RootState } from "src/redux/configStore";
import { Divider, List, Typography } from "antd";
import Avatar from "src/assets/imgs/avatarwhite.jpg";
import { fetchCommentOfRoomApi } from "src/redux/DetailRoomSlice/DetailRoomSlice";
import Comment from "./Comment";
import dayjs from "dayjs";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import {
  OrderRoomModel,
  postOrderRoomApi,
} from "src/redux/OrderRoomReducer/OrderRoomReducer";
import { openNotificationWithIcon } from "src/utils/notification";
import moment from "moment";
import { getStoreJSON } from "src/utils/setting";

const data = [
  {
    icon: <i className='fa-regular fa-house'></i>,
    title: "Sungwon là Chủ nhà siêu cấp",
    content:
      "Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách",
  },
  {
    icon: <i className='fa-regular fa-location-dot'></i>,
    title: "Địa điểm tuyệt vời",
    content: "90% khách gần đây đã xếp hạng 5 sao cho vị trí này.",
  },
  {
    icon: <i className='fa-regular fa-calendar'></i>,
    title: "Miễn phí hủy trong 48 giờ.",
    content: "",
  },
];

const dataItem = [
  {
    icon: "",
    item: "",
  },
];

type Props = {};

const DetailRoom = (props: Props) => {
  const dateFormat = "YYYY/MM/DD";
  const [rate, setRate] = useState(3);
  const [value, setValue] = useState<DateRangePickerValue>([null, null]);
  const user = getStoreJSON("userLogin");
  let [guest, setGuest] = useState(1);
  const dispatch: DispatchType = useDispatch();

  const { detailLocation } = useSelector(
    (state: RootState) => state.LocationSlice
  );

  const { allComment, comment } = useSelector(
    (state: RootState) => state.DetailRoomSlice
  );

  const handleChangeGuestNum = (increOrDecre: boolean) => {
    if (increOrDecre) {
      setGuest((prevState) => prevState + 1);
    } else {
      setGuest((prevState) => prevState - 1);
    }
  };
  let startDateTime = value[0]?.getTime();
  let endDateTime = value[1]?.getTime();
  const calNumOfDays = () => {
    if (startDateTime !== undefined && endDateTime !== undefined) {
      return Math.round((endDateTime - startDateTime) / (1000 * 3600 * 24));
    }
  };
  let numOfDays = calNumOfDays();
  const calTotalPrice = () =>
    numOfDays !== undefined ? detailLocation.giaTien * numOfDays : 0;
  const handleBooking = () => {
    if (user && value[0] && value[1]) {
      const bookingInfo: OrderRoomModel = {
        maPhong: detailLocation.id,
        ngayDen: moment(value[0]).format("L").toString(),
        ngayDi: moment(value[1]).format("L").toString(),
        soLuongKhach: guest,
        maNguoiDung: user.user.id,
      };
      console.log(bookingInfo);
      dispatch(postOrderRoomApi(bookingInfo));
      openNotificationWithIcon(
        "success",
        "Đặt phòng thành công",
        <p>
          Tiếp tục đặt phòng hoặc di chuyển tới
          <br />
          <a href='/profile'>Lịch sử đặt phòng</a>
        </p>
      );
    } else if (!user) {
      openNotificationWithIcon(
        "error",
        "Vui lòng đăng nhập để đặt phòng!",
        <a href='/login'>Đi tới trang đăng nhập</a>
      );
    }
  };

  const { id } = useParams<string>();

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getLocationByIdApi(Number(id)));
    dispatch(fetchCommentOfRoomApi(Number(id)));
  }, [id]);

  return (
    <section className='container mx-auto'>
      <Row className=''>
        <h4 className='align-center'>
          <TranslationOutlined className='mx-2 align-top' />
          {detailLocation.tenPhong}
        </h4>
      </Row>
      <div>
        <div className='flex justify-between items-center'>
          <p>
            <span className='rate mx-2'>
              <i className='fa-regular fa-star mx-1'></i>3
            </span>
            <span>.</span>
            <span className='mx-2'> 60 Đánh giá</span> <span>.</span>
            <span>
              <i className='fa-sharp fa-solid fa-medal mx-1'></i>Chủ nhà
            </span>
            <span>Địa chỉ</span>
          </p>
          <p>
            <span>
              <i className='fa-sharp fa-arrow-up-from-square'></i>Share
            </span>
            <span>
              <i className='fa-light fa-download'></i>Save
            </span>
          </p>
        </div>
      </div>
      <Row className='image w-full'>
        <img
          src={detailLocation?.hinhAnh}
          alt=''
          className='w-full h-full rounded-md  object-cover'
        />
      </Row>
      <Row className='detail'>
        <Col span={15}>
          <div className='flex justify-between mt-5 items-center'>
            <div>
              <h4>{detailLocation.tenPhong}</h4>
              <p>
                {detailLocation.khach} Khách . {detailLocation.phongNgu} Phòng
                ngủ . {detailLocation.phongTam} Phòng tắm
              </p>
            </div>
            <div>
              <img src={Avatar} alt='' className='rounded-full w-14 h-14 m-2' />
            </div>
          </div>
          <Divider orientation='left'></Divider>
          <div>
            <List
              size='small'
              className='border-none'
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  {
                    <div className='flex justify-start '>
                      <div className='mx-2 text-3xl items-start'>
                        {item.icon}
                      </div>
                      <div>
                        <h5> {item.title}</h5>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  }
                </List.Item>
              )}
            />
            <Divider orientation='left'></Divider>
          </div>
          <div>
            <h2 className=''>
              <img
                className='w-36 h-10 mx-1'
                src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'
                alt='AirCover'
              />
            </h2>
            <p className='text-lg'>
              Every booking includes free protection from Host cancellations,
              listing inaccuracies, and other issues like trouble checking in.
            </p>
            <p className='text-bold  underline'>Learn more</p>
            <Divider orientation='left'></Divider>
          </div>
          <div>
            <h4>Nơi này có những cho bạn ? </h4>
            <div className='grid grid-cols-2 gap-0 '>
              {detailLocation.bep && (
                <div className='flex'>
                  <div>
                    <svg
                      viewBox='0 0 32 32'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      style={{
                        display: "block",
                        height: "24px",
                        width: "24px",
                        fill: "currentcolor",
                      }}>
                      <path d='M26 1a5 5 0 0 1 5 5c0 6.389-1.592 13.187-4 14.693V31h-2V20.694c-2.364-1.478-3.942-8.062-3.998-14.349L21 6l.005-.217A5 5 0 0 1 26 1zm-9 0v18.118c2.317.557 4 3.01 4 5.882 0 3.27-2.183 6-5 6s-5-2.73-5-6c0-2.872 1.683-5.326 4-5.882V1zM2 1h1c4.47 0 6.934 6.365 6.999 18.505L10 21H3.999L4 31H2zm14 20c-1.602 0-3 1.748-3 4s1.398 4 3 4 3-1.748 3-4-1.398-4-3-4zM4 3.239V19h3.995l-.017-.964-.027-.949C7.673 9.157 6.235 4.623 4.224 3.364l-.12-.07zm19.005 2.585L23 6l.002.31c.045 4.321 1.031 9.133 1.999 11.39V3.17a3.002 3.002 0 0 0-1.996 2.654zm3.996-2.653v14.526C27.99 15.387 29 10.4 29 6a3.001 3.001 0 0 0-2-2.829z'></path>
                    </svg>
                  </div>
                  <div className='text-lg'>Stove</div>
                </div>
              )}

              {detailLocation.mayGiat && (
                <div className='flex'>
                  <div>
                    <i className='fa fa-bath'></i>
                  </div>
                  <div className='text-lg'> Washing machine</div>
                </div>
              )}
              {detailLocation.banLa && (
                <div className='flex'>
                  <div>
                    <i className='fa fa-portrait'></i>
                  </div>
                  <div className='text-lg'> Iron</div>
                </div>
              )}
              {detailLocation.tivi && (
                <div className='flex'>
                  <div>
                    <svg
                      viewBox='0 0 32 32'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      style={{
                        display: "block",
                        height: "24px",
                        width: "24px",
                        fill: "currentcolor",
                      }}>
                      <path d='M9 29v-2h2v-2H6a5 5 0 0 1-4.995-4.783L1 20V8a5 5 0 0 1 4.783-4.995L6 3h20a5 5 0 0 1 4.995 4.783L31 8v12a5 5 0 0 1-4.783 4.995L26 25h-5v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-2.995 2.824L3 8v12a3 3 0 0 0 2.824 2.995L6 23h20a3 3 0 0 0 2.995-2.824L29 20V8a3 3 0 0 0-2.824-2.995z'></path>
                    </svg>
                  </div>
                  <div className='text-lg'> Tivi</div>
                </div>
              )}
              {detailLocation.dieuHoa && (
                <div className='flex'>
                  <div>
                    <svg
                      viewBox='0 0 32 32'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      style={{
                        display: "block",
                        height: "24px",
                        width: "24px",
                        fill: "currentcolor",
                      }}>
                      <path d='M14 27l-.005.2a4 4 0 0 1-3.789 3.795L10 31H4v-2h6l.15-.005a2 2 0 0 0 1.844-1.838L12 27zM10 1c.536 0 1.067.047 1.58.138l.38.077 17.448 3.64a2 2 0 0 1 1.585 1.792l.007.166v6.374a2 2 0 0 1-1.431 1.917l-.16.04-13.554 2.826 1.767 6.506a2 2 0 0 1-1.753 2.516l-.177.008H11.76a2 2 0 0 1-1.879-1.315l-.048-.15-1.88-6.769A9 9 0 0 1 10 1zm5.692 24l-1.799-6.621-1.806.378a8.998 8.998 0 0 1-1.663.233l-.331.008L11.76 25zM10 3a7 7 0 1 0 1.32 13.875l.331-.07L29 13.187V6.813L11.538 3.169A7.027 7.027 0 0 0 10 3zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'></path>
                    </svg>
                  </div>
                  <div className='text-lg'>Air conditioner</div>
                </div>
              )}

              {detailLocation.wifi && (
                <div className='flex'>
                  <div>
                    <svg
                      viewBox='0 0 32 32'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      role='presentation'
                      focusable='false'
                      style={{
                        display: "block",
                        height: "24px",
                        width: "24px",
                        fill: "currentcolor",
                      }}>
                      <path d='m15.9999 20.33323c2.0250459 0 3.66667 1.6416241 3.66667 3.66667s-1.6416241 3.66667-3.66667 3.66667-3.66667-1.6416241-3.66667-3.66667 1.6416241-3.66667 3.66667-3.66667zm0 2c-.9204764 0-1.66667.7461936-1.66667 1.66667s.7461936 1.66667 1.66667 1.66667 1.66667-.7461936 1.66667-1.66667-.7461936-1.66667-1.66667-1.66667zm.0001-7.33323c3.5168171 0 6.5625093 2.0171251 8.0432368 4.9575354l-1.5143264 1.5127043c-1.0142061-2.615688-3.5549814-4.4702397-6.5289104-4.4702397s-5.5147043 1.8545517-6.52891042 4.4702397l-1.51382132-1.5137072c1.48091492-2.939866 4.52631444-4.9565325 8.04273174-4.9565325zm.0001-5.3332c4.9804693 0 9.3676401 2.540213 11.9365919 6.3957185l-1.4470949 1.4473863c-2.1746764-3.5072732-6.0593053-5.8431048-10.489497-5.8431048s-8.31482064 2.3358316-10.48949703 5.8431048l-1.44709488-1.4473863c2.56895177-3.8555055 6.95612261-6.3957185 11.93659191-6.3957185zm-.0002-5.3336c6.4510616 0 12.1766693 3.10603731 15.7629187 7.9042075l-1.4304978 1.4309874c-3.2086497-4.44342277-8.4328305-7.3351949-14.3324209-7.3351949-5.8991465 0-11.12298511 2.89133703-14.33169668 7.334192l-1.43047422-1.4309849c3.58629751-4.79760153 9.31155768-7.9032071 15.7621709-7.9032071z'></path>
                    </svg>
                  </div>
                  <div className='text-lg'> Wifi</div>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col span={9}>
          <div className='bg-white shadow-2xl m-5 sticky top-28 rounded-lg'>
            <div className='border-2 border-solid border-white p-3 rounded-lg '>
              <div className='flex justify-between'>
                <span className='flex'>
                  $<h6 className='mx-1'>690000</h6> đêm
                </span>
                <span>
                  <Rate value={1} count={1} /> 4 . 81 đánh giá
                </span>
              </div>
              <div className='my-3'>
                <div className='flex justify-between border-2 border-solid border-gray-300 rounded-t-lg '>
                  <div className='text-start w-full'>
                    <DateRangePicker
                      // label={<strong>CHECK-IN - CHECK-OUT</strong>}
                      placeholder='Chọn ngày nhận - trả phòng'
                      value={value}
                      onChange={setValue}
                      amountOfMonths={2}
                      icon={<i className='far fa-calendar-alt'></i>}
                      minDate={new Date()}
                      // dropdownType={ <= 767.98 ? "modal" : "popover"}
                      required
                    />
                  </div>
                </div>
                <div className='flex justify-between items-center border-2 border-solid border-gray-300 rounded-b-lg border-t-0'>
                  <button
                    className='border-none bg-gray-400 rounded-md px-2  m-2 text-white'
                    onClick={() => handleChangeGuestNum(false)}
                    disabled={guest <= 1 ? true : false}>
                    -
                  </button>
                  <p className='align-center mt-2 '> {guest} Guest </p>
                  <button
                    className='border-none bg-gray-400 rounded-md px-2  m-2 text-white'
                    onClick={() => handleChangeGuestNum(true)}
                    disabled={guest >= detailLocation.khach ? true : false}>
                    +
                  </button>
                </div>
              </div>

              <div className='my-2'>
                <button
                  className='w-full h-10 border-none rounded-lg text-white bg-pink my-2'
                  onClick={() => {
                    handleBooking();
                    const bookingInfo: OrderRoomModel = {
                      maPhong: 0,
                      ngayDen: "",
                      ngayDi: "",
                      soLuongKhach: 0,
                      maNguoiDung: 0,
                    };
                    console.log(bookingInfo);
                  }}
                  disabled={
                    value[0] === null || value[1] === null ? true : false
                  }>
                  Đặt phòng
                </button>
              </div>

              <p className='text-center text-gray-400'>
                Bạn vẫn chưa bị trừ tiền
              </p>

              <p className='flex justify-between'>
                <span>
                  ${detailLocation.giaTien} x {numOfDays} đêm
                </span>
                <span>${calTotalPrice()}</span>
              </p>
              <p className='flex justify-between'>
                <span>Phí dịch vụ</span> <span> 5 $</span>
              </p>
              <Divider orientation='left'> </Divider>
              <h5 className='flex justify-between'>
                <span>Tổng trước thuế </span> <span> {calTotalPrice()} $</span>
              </h5>
            </div>
          </div>
        </Col>
        <Divider orientation='left'></Divider>
      </Row>
      {/*-------------- Đánh giá ------------- */}
      <Row>
        <h6>Đánh giá</h6>
      </Row>
      <Row className='rate'>
        <Col span={12} className=''>
          <div className='m-2'>
            <div className='flex justify-between items-center'>
              <div className='text-base'> Mức độ sạch sẽ</div>
              <div>
                <Rate value={rate} />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-base'>Giao tiếp</div>
              <div>
                <Rate value={rate} />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-base'>Nhận phòng</div>
              <div>
                <Rate value={rate} />
              </div>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className='m-2'>
            <div className='flex justify-between items-center'>
              <div className='text-base'>Độ chính xác</div>
              <div>
                <Rate value={rate} />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-base'>Vị trí</div>
              <div>
                <Rate value={rate} />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-base'>Giá trị</div>
              <div>
                <Rate value={rate} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {/*-------------- Đánh giá ------------- */}
      <section className='comment mt-3'>
        <div className='flex flex-wrap'>
          {comment &&
            comment.map((item: Comment, index: number) => {
              return <Comment key={index} comment={item} />;
            })}
        </div>

        <div className='flex justify-center  items-center'>
          <button className='rounded-lg px-5 py-2 border-2 border-solid border-black font-bold bg-white'>
            All Comment
          </button>
        </div>
      </section>
    </section>
  );
};

export default DetailRoom;
