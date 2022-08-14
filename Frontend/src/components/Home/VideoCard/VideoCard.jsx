import React from "react";

function VideoCard({ data: { title, imgPath } }) {
  return (
    <>
      <div className="card h-100">
        <img src={imgPath} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-center ">{title}</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            expedita aliquid odio aperiam delectus tempora illo inventore, sed
            sapiente aut.
          </p>
          <a href="#a" className="btn btn-dark">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
}

export default VideoCard;
