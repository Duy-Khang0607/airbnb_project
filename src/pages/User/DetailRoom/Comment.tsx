import React from "react";
import avatar from "src/assets/imgs/avatarwhite.jpg";

type Props = {};

interface Comment {
    id: number,
    maPhong: number,
    ngayBinhLuan: string,
    noiDung: string,
    saoBinhLuan: number,
}

const Comment = (props: Props) => {
  return (
    <div>
      <div className="flex justify-start">
        <div className="w-1/5 ">
          <img src={avatar} alt="" className=" rounded-full w-16 h-16" />
        </div>
        <div className="w-4/5 ">
          <div className="h6">16 tháng 10 năm 2021</div>
          <span> </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
