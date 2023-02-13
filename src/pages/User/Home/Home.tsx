import { Row } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import CarouselSearch from "src/components/Carousel/CarouselSearch";
import { useDispatch, useSelector } from "react-redux";
import Location from "./Location/Location";
import Pagination from "src/components/Pagination/Pagination";
import { DispatchType, RootState } from "src/redux/configStore";
import { getRoomPaginationApi } from "src/redux/RoomReducer/RoomReducer";

type Props = {};
let timeout: ReturnType<typeof setTimeout>;

const Home = (props: Props) => {
  const { arrRoomPageIndex, totalRow, statusAction } = useSelector(
    (state: RootState) => state.RoomReducer
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostPerPage] = useState<number>(5);
  const dispatch: DispatchType = useDispatch();
  const getRoomPageIndexAction = () => {
    const action = getRoomPaginationApi(currentPage, postsPerPage);
    dispatch(action);
  };
  useEffect(() => {
    timeout = setTimeout(() => {
      // getAllLocationApi();
      getRoomPageIndexAction();
    }, 100);
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [currentPage, statusAction]);

  return (
    <div>
      <Row>
        <CarouselSearch />
      </Row>
      <Row>
        <Location />
      </Row>
      <Row className='flex justify-center pb-10'>
        <Pagination
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          totalRow={totalRow}
        />
      </Row>
    </div>
  );
};

export default Home;
