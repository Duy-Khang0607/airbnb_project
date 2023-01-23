import { Row } from "antd";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return <div>
    <Row>
      <div className="carosel">carosel</div>
    </Row>
    <Row>
      <div className="explore"></div>
    </Row>
    <Row>
      <div className="where"></div>
    </Row>

  </div>;
};

export default Home;
