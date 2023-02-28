import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import requester from "src/api/api";
import { DispatchType } from "../configStore";

export interface OrderRoomModel {
  id?: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}
export interface OrderRoomState {
  arrOrderRooms: OrderRoomModel[];
  statusAction: number;
}
const initialState: OrderRoomState = {
  arrOrderRooms: [],
  statusAction: 0,
};

const OrderRoomReducer = createSlice({
  name: "orderRoomReducer",
  initialState,
  reducers: {
    setArrOrderRoomsAction: (
      state: OrderRoomState,
      action: PayloadAction<OrderRoomModel[]>
    ) => {
      state.arrOrderRooms = action.payload;
    },
    setStatusAction: (state: OrderRoomState, action: PayloadAction<number>) => {
      state.statusAction = action.payload;
    },
  },
});

export const { setArrOrderRoomsAction, setStatusAction } =
  OrderRoomReducer.actions;

export default OrderRoomReducer.reducer;

export const getOrderRoomsApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.get("/api/dat-phong");
      // console.log(result.data.content);
      dispatch(setArrOrderRoomsAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

//Post DatPhong
export const postOrderRoomApi = (roomInfor: OrderRoomModel) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.post("/api/dat-phong", roomInfor);
      console.log(result.status);
      console.log(result);
      dispatch(setStatusAction(result.status));
    } catch (err) {
      console.log(err);
    }
  };
};

//Put DatPhong
export const editOrderRoomByIdApi = (id: number, roomInfor: OrderRoomModel) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.put(`/api/dat-phong/${id}`, roomInfor);
      dispatch(setStatusAction(result.status));
    } catch (err) {
      console.log(err);
    }
  };
};

//Delete DatPhong By ID
export const deleteOrderRoomByIdApi = (id: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.delete(`/api/dat-phong/${id}`);
      dispatch(setStatusAction(result.status));
    } catch (err) {
      console.log(err);
    }
  };
};
