import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "antd";
import requester from "src/api/api";
import { openNotificationWithIcon } from "src/utils/notification";
import { DispatchType } from "../configStore";

export interface RoomModel {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

export interface RoomState {
  arrRooms: RoomModel[];
  room: RoomModel;
  arrRoomId: number[];
  totalRow: number;
  statusAction: number;
}

const initialState: RoomState = {
  arrRooms: [],
  room: {} as RoomModel,
  arrRoomId: [],
  totalRow: 0,
  statusAction: 0,
};

const RoomReducer = createSlice({
  name: "roomReducer",
  initialState,
  reducers: {
    setArrRooms: (state: RoomState, action: PayloadAction<RoomModel[]>) => {
      state.arrRooms = action.payload;
    },
    setRoom: (state: RoomState, action: PayloadAction<RoomModel>) => {
      state.room = action.payload;
    },
    setTotalRow: (state: RoomState, action: PayloadAction<number>) => {
      state.totalRow = action.payload;
    },
    setStatusAction: (state: RoomState, action: PayloadAction<number>) => {
      state.statusAction = action.payload;
    },
  },
});

export const { setArrRooms, setRoom, setTotalRow, setStatusAction } =
  RoomReducer.actions;

export default RoomReducer.reducer;

// Lấy tất cả ds đặt phòng
export const getAllRoomsApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.get("/api/phong-thue");


      dispatch(setArrRooms(result.data.content));
      console.log(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};

// Lấy danh sách phòng vị trí theo id
export const getRoomsByLocationId = (locationId: undefined | string) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.get(
        `/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`
      );

      dispatch(setArrRooms(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

// Lấy danh sách đặt phòng theo id
export const getRoomByIdApi = (roomId: undefined | number | string) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.get(`/api/phong-thue/${roomId}`);
      dispatch(setRoom(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

// Thêm danh sách phòng thuê
export const addRoomApi = (room: RoomModel) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.post("/api/phong-thue", room);
      console.log(result.data.content);
      dispatch(setStatusAction(result.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Thêm phòng thành công
        </Tag>
      );
    } catch (err) {
      console.log(err);
      openNotificationWithIcon(
        "error",
        " ",
        <Tag color='error' className='text-xl'>
          Thêm phòng thất bại
        </Tag>
      );
    }
  };
};

// Xóa phòng
export const deleteRoomApi = (roomId: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.delete(`/api/phong-thue/${roomId}`);
      console.log(result.data.content);
      dispatch(setStatusAction(result.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Xóa thành công
        </Tag>
      );
    } catch (err) {
      console.log(err);
      openNotificationWithIcon(
        "error",
        " ",
        <Tag color='error' className='text-xl'>
          Xóa thất bại
        </Tag>
      );
    }
  };
};

// Chỉnh sửa phòng
export const editRoomApi = (id: number, room: RoomModel) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.put(`/api/phong-thue/${id}`, room);
      dispatch(setStatusAction(result.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Sửa thành công
        </Tag>
      );
      console.log(result.data.content);
    } catch (err: any) {
      console.log(err);
      openNotificationWithIcon(
        "error",
        " ",
        <Tag color='error' className='text-xl'>
          {err?.response.data.content}
        </Tag>
      );
    }
  };
};

// thêm hình , phòng
export const uploadRoomImgApi = (roomId: number, imgFile: string | Blob) => {
  return async () => {
    try {
      const result = await requester.post(
        `/api/phong-thue/upload-hinh-phong?maPhong=${roomId}`,
        imgFile
      );
      console.log(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};

// Tìm phòng
export const searchRoomApi = (
  pageIndex: string,
  pageSize: string,
  keyword: string | null
) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.get(
        `/api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
      );
      console.log(result.data.content.data);
      dispatch(setArrRooms(result.data.content.data));
      dispatch(setTotalRow(result.data.content.totalRow));
    } catch (err) {
      console.log(err);
    }
  };
};

export const clearStatusAction = () => {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(setStatusAction(0));
    } catch (err) {
      console.log(err);
    }
  };
};
