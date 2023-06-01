import React from "react";

const Loading = ({ className, children, type, style, ...props }) => {
  return (
    <div
      style={style}
      className="card-body flex justify-center items-center text-[18px]"
    >
      <div className="spinner-border text-primary" role="status">
        {" "}
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="text ml-4 ">Loading....</div>
    </div>
  );
};

export default Loading;
