import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import requester from 'src/api/api';
import { apiPath } from 'src/api/apiPath';

export interface Location {
    id:string;
    valueate: number;
    country: string;
    province: string;
    name: string;

    image: string;
}

export interface LocationState {
    locationList: Location[],

}

const initialState: LocationState = {
    locationList: [],
}

const LocationSlice = createSlice({
  name: "LocationSlice",
  initialState,
  reducers: {
    getAllLocation: (state: LocationState, action: PayloadAction<Location[]>) => {
                state.locationList = action.payload
    }
  }
});

export const {getAllLocation} = LocationSlice.actions

export default LocationSlice.reducer


// call api

// get all location 


export const getAllLocationApi = () => {
    return async (dispatch:DispatchType) => {
        try {
            const res = await requester({
                method: "GET",
                url: apiPath.LOCATION,
            })

            console.log(res.data.content)
            let locationList: Location[] = res.data.content

            // write action , type, payload dispatched reducer
            const action = getAllLocation(locationList)
            dispatch(action)
            
        } catch (error) {
            console.log(error)
        }
    }
}
