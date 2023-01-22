import React from "react";
import { Col, Row } from 'antd';
import { NavLink } from "react-router-dom";
import  style from "./Footer.module.css";

type Props = {};

const Footer = (props: Props) => {
  return <>
    

    <Row className="container m-auto">
      <Col span={6} className={style.col}>
        <h3>Support</h3>
        <NavLink to={""}>Help Center</NavLink>
        <NavLink to={""}>AirCover</NavLink>
        <NavLink to={""}>Supporting people with disablities</NavLink>
        <NavLink to={""}>Cancellation Opstions</NavLink>
        <NavLink to={""}>Our COVID-19 Response</NavLink>
        <NavLink to={""}>Report a neighborhoo concern</NavLink>
       
      </Col>
      <Col span={6}>
        <h3>Community</h3>
        <NavLink to={""}>Airbnb.org: disaster relief housing</NavLink>
        <NavLink to={""}>Combating discrimination</NavLink>
        
        </Col>
        <Col span={6}>
        <h3>Hosting</h3>
        <NavLink to={""}>Airbnb your home</NavLink>
        <NavLink to={""}>AirCover for Hosts</NavLink>
        <NavLink to={""}>Explore hosting resources</NavLink>
        <NavLink to={""}>Visit our community forum</NavLink>
        <NavLink to={""}>How to host responsibly</NavLink>
        </Col>
        <Col span={6}>
        <h3>Airbnb</h3>
        <NavLink to={""}>Newsroom </NavLink>
        <NavLink to={""}>Learn about new features</NavLink>
        <NavLink to={""}>Letter from our founders</NavLink>
        <NavLink to={""}>Cardeers</NavLink>
        <NavLink to={""}>Investors</NavLink>
        <NavLink to={""}>Gift  cards</NavLink>
        </Col>
    </Row>
  </>;
};

export default Footer;
