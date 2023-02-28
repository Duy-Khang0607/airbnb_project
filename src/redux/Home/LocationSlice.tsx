import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import requester from "src/api/api";
import { apiPath } from "src/api/apiPath";
import { IdcardFilled } from "@ant-design/icons";
import { identity } from "lodash";

export interface Location {
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

export interface LocationState {
  locationList: Location[];
  detailLocation: Location | any;
}

const initialState: LocationState = {
  locationList: [],
  detailLocation: [],
};

const LocationSlice = createSlice({
  name: "LocationSlice",
  initialState,
  reducers: {
    getAllLocation: (
      state: LocationState,
      action: PayloadAction<Location[]>
    ) => {
      state.locationList = action.payload;
    },
    getLocationById: (
      state: LocationState,
      action: PayloadAction<Location[]>
    ) => {
      state.detailLocation = action.payload;
    },
  },
});

export const { getAllLocation, getLocationById } = LocationSlice.actions;

export default LocationSlice.reducer;

export const getAllLocationApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.LOCATION,
      });
      let locationList: Location[] = res.data.content;
      console.log(locationList);
      // write action , type, payload dispatched reducer
      // const action = getAllLocation(locationList)
      // dispatch(action)
    } catch (error) {
      console.log(error);
    }
  };
};

// detail page
// get location by id

export const getLocationByIdApi = (id: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.LOCATIONBYID + id,
      });
      console.log(res.data.content);
      let location = res.data.content;
      dispatch(getLocationById(location));
    } catch (error: any) {
      console.log({ error });
    }
  };
};
