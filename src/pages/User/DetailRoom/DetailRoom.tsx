import { StarOutlined, TranslationOutlined } from "@ant-design/icons";
import { Col, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationByIdApi } from "src/redux/Home/LocationSlice";
import { DispatchType, RootState } from "src/redux/configStore";
import { Divider, List, Typography } from "antd";
import Avatar from "src/assets/imgs/avatarwhite.jpg";

const data = [
  {
    icon: <i className="fa-regular fa-house"></i>,
    title: "Sungwon là Chủ nhà siêu cấp",
    content:
      "Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách",
  },
  {
    icon: <i className="fa-regular fa-location-dot"></i>,
    title: "Địa điểm tuyệt vời",
    content: "90% khách gần đây đã xếp hạng 5 sao cho vị trí này.",
  },
  {
    icon: <i className="fa-regular fa-calendar"></i>,
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
  let [guest, setGuest] = useState();
  const dispatch: DispatchType = useDispatch();

  const { detailLocation } = useSelector(
    (state: RootState) => state.LocationSlice
  );

  console.log(detailLocation);
  const navigate = useNavigate();

  const { id } = useParams<string>();

  useEffect(() => {
    dispatch(getLocationByIdApi(Number(id)));
  }, [id]);
  return (
    <div className="container px-20 my-5 mx-auto">
      <Row className="">
        <h4 className="align-center">
          {" "}
          <TranslationOutlined className="mx-2 align-top" />
          {detailLocation.tenPhong}
        </h4>
      </Row>
      <div>
        <div className="flex justify-between items-center">
          <p>
            {" "}
            <span className="rate mx-2">
              <i className="fa-regular fa-star mx-1"></i>3
            </span>{" "}
            <span>.</span>
            <span className="mx-2"> 60 Đánh giá</span> <span>.</span>
            <span>
              <i className="fa-sharp fa-solid fa-medal mx-1"></i>Chủ nhà{" "}
            </span>{" "}
            <span>Địa chị</span>
          </p>
          <p>
            {" "}
            <span>
              <i className="fa-sharp fa-arrow-up-from-square"></i>Share{" "}
            </span>{" "}
            <span>
              <i className="fa-light fa-download"></i>Save
            </span>
          </p>
        </div>
      </div>
      <Row className="image w-full">
        <img
          src={detailLocation?.hinhAnh}
          alt=""
          className="w-full rounded-md h-96"
        />
      </Row>
      <Row className="detail">
        <Col span={15}>
          <div className="flex justify-between mt-5 items-center">
            <div>
              <h4>Entire bungalow hosted by Massimo</h4>
              <p>
                {detailLocation.khach} Khách . {detailLocation.phongNgu} Phòng
                ngủ . {detailLocation.phongTam} Phòng tắm
              </p>
            </div>
            <div>
              {" "}
              <img
                src={Avatar}
                alt=""
                className="rounded-full w-14 h-14 m-2"
              />{" "}
            </div>
          </div>
          <Divider orientation="left"></Divider>
          <div>
            <List
              size="small"
              className="border-none"
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  {
                    <div className="flex justify-start ">
                      <div className="mx-2 text-3xl items-start">
                        {item.icon}{" "}
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
            <Divider orientation="left"></Divider>
          </div>
          <div>
            <h2 className="">
              <img
                className="w-36 h-10 mx-1"
                src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
                alt="AirCover"
              />
            </h2>
            <p className="text-lg">
              Every booking includes free protection from Host cancellations,
              listing inaccuracies, and other issues like trouble checking in.
            </p>
            <p className="text-bold  underline">Learn more</p>
            <Divider orientation="left"></Divider>
          </div>

          <div>
            <h4>What this place offers</h4>

            <div className="grid grid-cols-2 gap-0 ">
              {detailLocation.bep && (
                <div className="flex">
                  <div>
                    {" "}
                    <i className="fa-sharp fa-solid fa-fire-burner mx-2"></i>
                  </div>
                  <div className="text-lg"> Stove</div>
                </div>
              )}

              {detailLocation.mayGiat && (
                <div className="flex">
                  <div>
                    {" "}
                    <i className="fa-regular fa-washing-machine"></i>
                  </div>
                  <div className="text-lg"> Washing mashine</div>
                </div>
              )}
              {detailLocation.banLa && (
                <div className="flex">
                  <div>
                    {" "}
                    <i className="fa-regular fa-clothes-hanger"></i>
                  </div>
                  <div className="text-lg"> Iron</div>
                </div>
              )}
              {detailLocation.tivi && (
                <div className="flex">
                  <div>
                    {" "}
                    <i className="fa-regular fa-tv"></i>
                  </div>
                  <div className="text-lg"> Tivi</div>
                </div>
              )}
              {detailLocation.dieuHoa && (
                <div className="flex">
                  <div>
                    {" "}
                    <i className="fa-regular fa-air-conditioner"></i>
                  </div>
                  <div className="text-lg"> Air conditioner</div>
                </div>
              )}

              {detailLocation.wifi && (
                <div className="flex">
                  <div>
                    {" "}
                    <i className="fa-duotone fa-wifi"></i>
                  </div>
                  <div className="text-lg"> Wifi</div>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col span={9}>
          <div className="bg-white shadow-xl m-5 sticky top-28">
            <div className="border-2 border-solid border-gray-300 p-3 rounded-md ">
              <div className="flex justify-between">
                <span>$ 690000 đêm </span>
                <span>4 . 81 đánh giá</span>
              </div>

              <div>
                <div className="flex justify-between border-2 border-solid border-gray-300 rounded-t-lg">
                  <div className="text-start w-1/2">
                    <h6>NHẬN PHÒNG</h6>
                    <p>04-02-2023</p>
                  </div>
                  <div className=" w-1/2 border-l-2 border-solid border-gray-300 border-y-0 border-r-0">
                    <h6>NHẬN PHÒNG</h6>
                    <p>04-02-2023</p>
                  </div>
                </div>
                <div className="flex justify-between border-2 border-solid border-gray-300 rounded-b-lg border-t-0">
                  <button className="border-none bg-gray-400 rounded-md px-2  m-2 text-white">
                    -
                  </button>
                  <p> {guest}guest </p>
                  <button className="border-none bg-gray-400 rounded-md px-2  m-2 text-white">
                    +
                  </button>
                </div>
              </div>

              <div className="my-2">
                <button className="w-full h-10 border-none rounded-lg text-white bg-pink">
                  Đặt phòng
                </button>
              </div>

              <p className="text-center text-gray-400">
                Bạn vẫn chưa bị trừ tiền
              </p>

              <p className="flex justify-between">
                {" "}
                <span> $ 800000 x 0 đêm</span> <span> 0 $</span>{" "}
              </p>
              <p className="flex justify-between">
                {" "}
                <span> $ 800000 x 0 đêm</span>{" "}
              </p>
              <Divider orientation="left"> </Divider>
              <h5 className="flex justify-between">
                {" "}
                <span>Tổng trước thuế </span> <span> 0 $</span>
              </h5>
            </div>
          </div>
        </Col>
        <Divider orientation="left"></Divider>
      </Row>
      
      <Row> <h6>Đánh giá</h6></Row>
      <Row className="rate">
      <Col span={12} className="">
         <div className="m-2"> <div className="flex justify-between items-center">
            <div className="text-base"> Degree of cleanliness</div>
            <div>
              {" "}
              <Rate />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-base"> Communicate</div>
            <div>
              {" "}
              <Rate />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-base">Check in</div>
            <div>
              {" "}
              <Rate />
            </div>
          </div></div>
        </Col>
        <Col span={12}>
       <div className="m-2">
       <div className="flex justify-between items-center">
            <div className="text-base">Accuracy</div>
            <div>
              {" "}
              <Rate />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-base"> Location</div>
            <div>
              {" "}
              <Rate />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-base">Value</div>
            <div>
              {" "}
              <Rate />
            </div>
          </div>
       </div>
        </Col>
      </Row>
      <Row className="comment">
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
};

export default DetailRoom;
