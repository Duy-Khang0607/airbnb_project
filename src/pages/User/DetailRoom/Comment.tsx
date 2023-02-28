import { Col, Row } from "antd";
import React from "react";
import avatar from "src/assets/imgs/avatarwhite.jpg";

type Props = {
  comment: Comment;
};

interface Comment {
  id: number;
  maPhong: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  tenNguoiBinhLuan: string;
  avatar: any;
}

const Comment = (props: Props) => {
  const { comment } = props;

  return (
    <Row className='flex justify-start mt-2 w-80'>
      <div className='w-1/5 '>
        <img src={comment.avatar} alt='' className=' rounded-full w-14 h-14' />
      </div>
      <div className='w-4/5 text align-middle '>
        <div className=''>
          <h6>{comment.tenNguoiBinhLuan}</h6>
          <p>{comment.ngayBinhLuan}</p>
        </div>
      </div>
      <p> {comment.noiDung}</p>
    </Row>
  );
};

export default Comment;
