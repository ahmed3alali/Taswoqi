import React from "react";
import errorPic from "../../images/404.svg"

const NotFound = () => {
  return (
    <div>
      {" "}
      <div className="row">
        <div className="d-flex justify-content-center page-not-found-wrapper">
          <img
            src={errorPic}
            height="550"
            width="550"
            alt="404_not_found"
          />
        </div>
        <h5 className="text-center">
          Page Not Found. Go to <a href="/">Homepage</a>
        </h5>
      </div>
    </div>
  );
};

export default NotFound;