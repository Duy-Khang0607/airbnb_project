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
    tenNguoiBinhLuan: string;
    avatar: any;
}

interface CommentState {
    allComment: Comment[],
    comment: Comment[]
}

const initialState: CommentState = {
    allComment: [],
    comment: [],
}

const DetailRoomSlice = createSlice({
  name: "DetailRoomSlice",
  initialState,
  reducers: {
    setAllComment : (state: CommentState,action: PayloadAction<Comment[]> ) => {
        state.allComment = action.payload
    },
    setCommentByRoom : (state: CommentState,action: PayloadAction<Comment[]> ) => {
        state.comment = action.payload
    }
  }
});

export const {setAllComment, setCommentByRoom} = DetailRoomSlice.actions

export default DetailRoomSlice.reducer


// api


export const fetchAllCommentApi = () => {
    return async (dispatch: DispatchType) => {
            try {
                const res = await requester({
                    method: "GET",
                    url: apiPath.ALLCOMMENT
                })

                dispatch(setAllComment(res.data.content) )




            } catch (error) {
                console.log(error)
            }


    }
}

export const fetchCommentOfRoomApi = (id: string | number) => {
    return async (dispatch: DispatchType) => {
            try {
                const res = await requester({
                    method: "GET",
                    url: apiPath.COMMENTBYROOM + id
                })

                dispatch(setCommentByRoom(res.data.content) )




            } catch (error) {
                console.log(error)
            }


    }
}