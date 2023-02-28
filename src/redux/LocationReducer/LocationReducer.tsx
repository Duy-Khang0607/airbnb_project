import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import requester from "src/api/api";
import { openNotificationWithIcon } from "src/utils/notification";
import { getStore } from "src/utils/setting";
import { DispatchType, RootState } from "../configStore";

export interface LocationModel {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}
export interface LocationState {
  arrLocation: LocationModel[];
  location: LocationModel;
  arrLocationPageIndex: LocationModel[];
  totalRow: number;
  statusAction: number;
}

const initialState: LocationState = {
  arrLocation: [],
  location: {} as LocationModel,
  arrLocationPageIndex: [],
  totalRow: 0,
  statusAction: 0,
};

const LocationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {
    setArrLocationAction: (
      state: LocationState,
      action: PayloadAction<LocationModel[]>
    ) => {
      state.arrLocation = action.payload;
    },
    setLocationById: (
      state: LocationState,
      action: PayloadAction<LocationModel>
    ) => {
      state.location = action.payload;
    },
    setArrLocationByPageIndex: (
      state: LocationState,
      action: PayloadAction<LocationModel[]>
    ) => {
      state.arrLocationPageIndex = action.payload;
    },
    setTotalRow: (state: LocationState, action: PayloadAction<number>) => {
      state.totalRow = action.payload;
    },
    setStatusAction: (state: LocationState, action: PayloadAction<number>) => {
      state.statusAction = action.payload;
    },
  },
});

export const {
  setArrLocationAction,
  setLocationById,
  setTotalRow,
  setArrLocationByPageIndex,
  setStatusAction,
} = LocationReducer.actions;

export default LocationReducer.reducer;

// export const getLocationApi = () => {
//   return async (dispatch: DispatchType) => {
//     try {
//       const res = await requester({
//         url: "/api/vi-tri",
//         method: "GET",
//       });
//       const content: LocationModel[] = res.data.content;
//       //  Sau khi lấy dữ liệu từ API về => Bắt đầu dispatch lên store
//       const action: PayloadAction<LocationModel[]> =
//         setArrLocationAction(content);
//       dispatch(action);
//       console.log(content);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const getLocationApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.get("/api/vi-tri");
      console.log(result);
      dispatch(setArrLocationAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLocationByIdApi = (locationId: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.get(`/api/vi-tri/${locationId}`);
      dispatch(setLocationById(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLocationPaginationApi = (
  pageIndex: number,
  pageSize: number,
  keyword?: string
) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.get(
        `/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      console.log(result.data.content.data);
      dispatch(setArrLocationByPageIndex(result.data.content.data));
      // console.log(result.data.content.totalRow);
      dispatch(setTotalRow(result.data.content.totalRow));
    } catch (err) {
      console.log(err);
    }
  };
};

//delete location
export const deleteLocationApi = (viTri: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.delete(`/api/vi-tri/${viTri}`);
      console.log(result.data.content);
      dispatch(setStatusAction(result.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Xóa thành công
        </Tag>
      );
    } catch (err: any) {
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

//post location
export const postLocationApi = (model: LocationModel) => {
  return async (dispatch: DispatchType) => {
    try {
      let result = await requester({
        url: "/api/vi-tri",
        method: "POST",
        data: model,
      });
      console.log(result.status);
      dispatch(setStatusAction(result.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Thêm vị trí thành công
        </Tag>
      );
    } catch (err: any) {
      console.log(err?.response.data.content);
      openNotificationWithIcon(
        "error",
        " ",
        <Tag color='error' className='text-lg'>
          {err?.response.data.content}
        </Tag>
      );
    }
  };
};

export const UploadImgLocationApi = (
  maViTri: number,
  formFile: LocationModel
) => {
  return async (dispatch: DispatchType) => {
    try {
      let result = await requester.post(
        `/api/vi-tri/upload-hinh-vitri?maViTri=${maViTri}`,
        formFile
      );
      console.log(result.status);
      dispatch(setStatusAction(result.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Upload ảnh thành công
        </Tag>
      );
    } catch (err: any) {
      console.log(err?.response.data);
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

//put location
export const putLocationApi = (id: number, viTri: LocationModel) => {
  return async (dispatch: DispatchType) => {
    try {
      let result = await requester.put(`/api/vi-tri/${id}`, viTri);
      console.log(result.status);
      dispatch(setStatusAction(result.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Sửa thành công
        </Tag>
      );
    } catch (err: any) {
      console.log(err?.response.data);
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

//clear status
export const clearStatusAction = () => {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(setStatusAction(0));
    } catch (err) {
      console.log(err);
    }
  };
};
