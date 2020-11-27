import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";

function Single() {
  const location = useLocation();
  return (
    <div>
      <Nav />
      {location.state &&
        location.state.item &&
        location.state.item.tests.map((item) => (
          <div className="col-4" style={{ marginLeft: "34%" }}>
            <div className="col-10 mb-2 mt-4 text-center bg-secondary">
              <div class="card shadow bg-secondary">
                <div class="card-body shadow">
                  <h6 class="card-title text-white">
                    Subject : {item.subject}
                  </h6>
                  <h6 class="card-title text-white p-2 bg-secondary">
                    Marks :{item.Marks}
                  </h6>
                  <h6 class="card-title text-white">Result:{item.status}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Single;
