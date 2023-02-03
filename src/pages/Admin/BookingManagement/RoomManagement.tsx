import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "src/components/Admin/Room/TablePagination/TablePagination";
import { DispatchType, RootState } from "src/redux/configStore";
import {
  clearStatusAction,
  deleteRoomApi,
  RoomModel,
  searchRoomApi,
} from "src/redux/RoomReducer/RoomReducer";
import { Modal } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  getLocationApi,
  LocationModel,
} from "src/redux/LocationReducer/LocationReducer";
import RoomAdminForm from "./RoomAdminForm";
import SortButton from "src/components/Admin/Room/SortButton/SortButton";
import { Button, Popconfirm } from "antd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { HomeOutlined } from "@ant-design/icons";

let timeout: ReturnType<typeof setTimeout>;

// table header
const tableHeaders: { key: keyof RoomModel; label: string }[] = [
  {
    key: "id",
    label: "Mã phòng",
  },
  {
    key: "tenPhong",
    label: "Tên phòng",
  },
  {
    key: "hinhAnh",
    label: "Hình ảnh",
  },
  {
    key: "maViTri",
    label: "Vị trí",
  },
  {
    key: "moTa",
    label: "Mô tả",
  },
  {
    key: "giaTien",
    label: "Giá tiền",
  },
];

// type for sort table
export type SortKeys = keyof RoomModel;

export type SortOrder = "asc" | "desc" | null;
// ----------------------

type Props = {};

export default function RoomManagement({}: Props) {
  const { arrRooms, totalRow, statusAction } = useSelector(
    (state: RootState) => state.RoomReducer
  );
  console.log(totalRow);

  const { arrLocation } = useSelector(
    (state: RootState) => state.LocationReducer
  );

  const [openModal, setOpenModal] = useState<boolean>(false);

  const selectedRoom = useRef<null | RoomModel>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const keyword = useRef("");

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // render room location based on room.maViTri
  const renderRoomLocation = (maViTri: number) => {
    if (arrLocation.length > 0) {
      let index = arrLocation?.findIndex(
        (location: LocationModel) => location.id === maViTri
      );
      let location = arrLocation[index];
      return (
        location?.tenViTri +
        ", " +
        location?.tinhThanh +
        ", " +
        location?.quocGia
      );
    }
  };

  // ------------- Table Pagination --------------
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageIndex = useRef<string>("1");

  const pageSize = 10;

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    pageIndex.current = page.toString();
  };
  // -------------------------------------

  // --------------- sort table function ------------------
  const [sortKey, setSortKey] = useState<SortKeys>("id");

  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const handleSort = ({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: RoomModel[];
    sortKey: SortKeys;
    reverse: boolean;
  }) => {
    if (arrRooms.length > 0) {
      if (!sortKey || !sortOrder) return tableData;

      const sortedData = [...arrRooms].sort((a, b) => {
        if (sortKey === "tenPhong" || sortKey === "moTa") {
          return a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? 1 : -1;
        }

        return a[sortKey] > b[sortKey] ? 1 : -1;
      });

      if (reverse) {
        return sortedData.reverse();
      }

      return sortedData;
    }
  };

  const sortedData = useCallback(
    () =>
      handleSort({
        tableData: arrRooms,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [arrRooms, sortKey, sortOrder]
  );

  const changeSort = (key: SortKeys) => {
    if (sortKey !== key && sortOrder) {
      setSortOrder("asc");
      setSortKey(key);
    } else {
      if (!sortOrder) {
        setSortOrder("asc");
      }

      if (sortOrder) {
        setSortOrder(sortOrder === "asc" ? "desc" : null);
      }
    }
    setSortKey(key);
  };
  // ------------------------------------

  // onClick edit button
  const handleClickEdit = (room: RoomModel) => {
    setOpenModal(true);
    selectedRoom.current = room;
  };

  // onClick add button
  const handleClickAdd = () => {
    setOpenModal(true);
    selectedRoom.current = null;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const renderRoomAdminForm = useCallback(() => {
    return (
      <RoomAdminForm
        room={selectedRoom.current ? selectedRoom.current : null}
        handleCloseModal={handleCloseModal}
      />
    );
  }, [selectedRoom.current]);

  const dispatch: DispatchType = useDispatch();

  const handleDeleteRoom = (roomId: number) => {
    dispatch(deleteRoomApi(roomId));
    const clearStatus = clearStatusAction();
    dispatch(clearStatus);
  };

  useEffect(() => {
    dispatch(searchRoomApi(pageIndex.current, pageSize.toString(), searchTerm));
    console.log("on mounted");
  }, [pageIndex.current, pageSize.toString(), statusAction]);

  useEffect(() => {
    timeout = setTimeout(() => {
      if (searchTerm.length > 0) {
        dispatch(
          searchRoomApi(pageIndex.current, pageSize.toString(), searchTerm)
        );
        console.log("on search");
      }
    }, 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        console.log("unmouting");
      }
    };
  }, [pageIndex.current, pageSize, searchTerm, statusAction]);

  useEffect(() => {
    dispatch(getLocationApi());
  }, [statusAction]);

  return (
    <div className='admin-room'>
      <h1 className='text-4xl text-center'>Quản lý thông tin phòng</h1>
      <Button className='text-xl ' type='primary' onClick={handleClickAdd}>
        <i className='fa fa-home mr-2'></i>
        Thêm phòng
      </Button>
      {/* Thanh Search */}
      <form>
        <div className='admin__searchBar input-group mt-2'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchTermChange}
            className='form-control'
            placeholder='Start your search'
            aria-label='Start your search'
            aria-describedby='basic-addon2'
          />
          <div className='input-group-append'>
            <button className='btn btn-outline-secondary' type='button'>
              <i className='fa fa-search'></i>
            </button>
          </div>
        </div>
      </form>

      <table className='table table-striped'>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th onClick={() => changeSort(header.key)}>
                <div className='d-flex align-items-center justify-content-between'>
                  <span>{header.label}</span>
                  <SortButton
                    colKey={header.key}
                    {...{
                      sortKey,
                      sortOrder,
                    }}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {arrRooms.length > 0 &&
            sortedData()?.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.tenPhong}</td>
                <td>
                  <LazyLoadImage
                    src={room.hinhAnh}
                    alt={room.tenPhong}
                    effect='black-and-white'
                    style={{ width: "200px", borderRadius: "10px" }}
                  />
                </td>
                <td>
                  {arrLocation.length > 0 && renderRoomLocation(room.maViTri)}
                </td>
                <td>
                  {room.moTa.length > 200
                    ? room.moTa.slice(0, 200) + "..."
                    : room.moTa}
                </td>
                <td>${room.giaTien}</td>
                <td>
                  <div className='d-flex'>
                    <div className='btnEdit me-2'>
                      <button
                        className='btn btn-outline-warning'
                        onClick={() => {
                          handleClickEdit(room);
                        }}>
                        <i className='fa fa-edit'></i>
                      </button>
                    </div>
                    <Popconfirm
                      title='Bạn có muốn xóa ? '
                      onConfirm={() => {
                        handleDeleteRoom(room.id);
                      }}>
                      <div className='btnDelete'>
                        <button className='btn btn-outline-danger'>
                          <DeleteForeverIcon />
                        </button>
                      </div>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* table pagination */}
      <TablePagination
        totalRow={totalRow}
        pageSize={pageSize}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />

      {/* modal */}
      <Modal show={openModal} size='xl' className='modal-dialog-scrollable'>
        <Modal.Header>
          <Modal.Title className='text-4xl mx-auto'>
            {selectedRoom.current ? "Cập nhật" : "Thêm phòng mới"}
          </Modal.Title>
          <Button type='primary' danger onClick={() => setOpenModal(false)}>
            <i className='fa fa-times'></i>
          </Button>
        </Modal.Header>
        <Modal.Body>{renderRoomAdminForm()}</Modal.Body>
      </Modal>
    </div>
  );
}
