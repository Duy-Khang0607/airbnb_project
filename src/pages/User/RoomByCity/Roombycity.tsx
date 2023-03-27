import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LocationItem from "src/components/LocationItem/LocationItem";
import MapGoogle from "src/components/MapGoogle/MapGoogle";
import { getRoomsByLocationId } from "src/redux/RoomReducer/RoomReducer";
import { DispatchType, RootState } from "src/redux/configStore";

type Props = {};

const Roombycity = (props: Props) => {
  const dispatch: DispatchType = useDispatch();

  const { id } = useParams();

  const { arrRooms } = useSelector((state: RootState) => state.RoomReducer);

  useEffect(() => {
    dispatch(getRoomsByLocationId(Number(id)));
  }, [id]);

  return (
    <section>
      <Row>
        <Col lg={12} className='mt-32'>
          <div className='flex flex-wrap'>
            {arrRooms.map((item, index) => {
              return <LocationItem key={index} location={item} />;
            })}
          </div>
        </Col>
        <Col lg={12} className='mt-32'>
          <MapGoogle />
        </Col>
      </Row>
    </section>
  );
};

export default Roombycity;
