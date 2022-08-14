import React from "react";

function Feature({ data: { title, icon } }) {
  return (
    <div className="pb-5">
      <i> {icon}</i>
      <h3 className="py-3 h2 fw-bolder text-uppercase">{title}</h3>
      <p className="lead">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi beatae
        maiores inventore sit eaque repellat fugiat iure soluta doloremque et.
      </p>
    </div>
  );
}

export default Feature;
