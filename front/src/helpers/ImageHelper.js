import React from "react";
// import { API } from "../../backend";

const API = process.env.REACT_APP_API_URL

const ImageHelper = ({ jobId }) => {
  const imgUrl = jobId
    ? `${API}getphoto/${jobId}`
    : "https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  return <img className="w-full" src={imgUrl} alt="Product Photo" />;
};

export default ImageHelper;