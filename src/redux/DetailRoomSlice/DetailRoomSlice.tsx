import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { DispatchType, RootState } from '../configStore';
import requester from 'src/api/api';
import { apiPath } from 'src/api/apiPath';

interface Comment {
    id: number,
    maPhong: number,
    ngayBinhLuan: string,
    noiDung: string,
    saoBinhLuan: number,
}

interface CommentState {
    comment: Comment[]
}

const initialState: CommentState = {
    comment: []
}

const DetailRoomSlice = createSlice({
  name: "DetailRoomSlice",
  initialState,
  reducers: {
    setComment : (state: CommentState,action: PayloadAction<Comment[]> ) => {
        state.comment = action.payload
    }
  }
});

export const {} = DetailRoomSlice.actions

export default DetailRoomSlice.reducer


// api


export const fectchCommentApi = () => {
    return async (dispatch: DispatchType) => {
            try {
                const res = await requester({
                    method: "GET",
                    url: apiPath.COMMENT
                })

                console.log(res.data.content)




            } catch (error) {
                console.log(error)
            }


    }
}