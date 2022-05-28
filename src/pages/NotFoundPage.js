import * as React from "react";
import withRoot from "./modules/withRoot";

const PageNotFound = () => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <img
          src="https://i.imgur.com/Q2BAOd2.png"
          alt="404 Not Found"
          height="250px"
        />
        <div style={{ textAlign: "center" }}>
          <h1>404 Not Found</h1>
          <h3>The Page is not on the Map.</h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRoot(PageNotFound);
