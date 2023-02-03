import { StarOutlined, TranslationOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationByIdApi } from "src/redux/Home/LocationSlice";
import { DispatchType } from "src/redux/configStore";

type Props = {};

const DetailRoom = (props: Props) => {
  const dispatch: DispatchType = useDispatch();

  const navigate = useNavigate();

 const {id}= useParams<string>();
 

  useEffect(()=> {
    dispatch(getLocationByIdApi(Number(id)))
  }, [id])
  return <div className="container p-20 mx-auto">
   <Row className="">
   
     
     <h4> <TranslationOutlined className="mx-2" /> Nha Trang</h4>
    
    
   </Row>
   <div>
   <div className="flex justify-between items-center">
     <p> <span className="rate mx-2"><StarOutlined />3</span> <span className="mx-2">Đánh giá</span> <span>Chủ nhà </span> </p>
     <p> <span>Share </span>  <span>Save</span></p>
     </div>
   </div>
   <Row className="image">
    <img src="" alt="" />
    </Row>
    <Row className="detail">
      <Col span={16}>
        <h5>Toàn bộ căn hộ</h5>
        <p>6 khách , 2 phòng ngủ</p>
      </Col>
      <Col span={8}>
      </Col>
    </Row>

    <Row className="rate">
      <Col span={12}></Col>
      <Col span={12}></Col>
    
    </Row>
   
    <Row className="comment">
      <Col span={12}></Col>
      <Col span={12}></Col>
    
    </Row>
   


  </div>;
};

export default DetailRoom;
