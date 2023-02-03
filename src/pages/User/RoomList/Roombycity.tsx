import { Col, Row } from "antd";
import React from "react";
import LocationItem from "src/components/LocationItem/LocationItem";
import MapGoogle from "src/components/MapGoogle/MapGoogle";

type Props = {};

const Roombycity = (props: Props) => {
  return <div>
     <Row>
      <Col span={12}>
        
        <LocationItem location={""}/>
      </Col>
      <Col span={12}>
        <MapGoogle/>


        
      </Col>

    </Row>
  </div>;
};

export default Roombycity;
