import { Row } from "antd";
import React from "react";
import CarouselSearch from "src/components/Carousel/CarouselSearch";
import Location from "./Location/Location";

type Props = {};

const Home = (props: Props) => {
  return <div >
    <Row>
      <CarouselSearch/>
    </Row>
    <Row>
      <Location/>
    </Row>
    <Row>
      <div className="where"></div>
    </Row>

  </div>;
};

export default Home;
