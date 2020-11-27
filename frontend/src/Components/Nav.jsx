import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { dashBoardData, searchStudent } from "../Redux/action";

function Nav(props) {
  const email = useSelector((state) => state.userEmail);
  const student = useSelector((state) => state.searchedstudent);
  const lengthId = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  let dynamicRouting = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [sort, setSort] = useState(dynamicRouting.get("sorted") || null);
  const [filter, setFilter] = useState(dynamicRouting.get("filter") || null);

  const [name, setName] = useState("");

  const handleSearch = () => {
    dispatch(searchStudent({ email, name }));
  };

  const handleQuery = (type, value) => {
    if (type === "sort") {
      setSort(value);
    } else {
      setFilter(value);
    }
  };

  useEffect(() => {
    let val = sort === "asc" ? 1 : sort === "" ? undefined : -1;
    dispatch(dashBoardData({ email, age: val, gender: filter }));
    history.push(`/dashboard?sort=${sort}&filter=${filter}`);
  }, [sort, filter]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-lg-12 col-sm-12 col-md-12 bg-dark "
            style={{
              padding: "10px",
              fontFamily: "Fredericka the Great, cursive",
              fontWeight: "bold",
            }}
          >
            <h2
              style={{ fontSize: "30px", color: "white", textAlign: "center" }}
            >
              TUTION MANAGER
            </h2>

            <span>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/167/167755.svg"
                style={{ width: "60px", padding: "5px" }}
                alt="img"
              />
            </span>
            <input
              type="text"
              placeholder="SEARCH STUDENT BY ID"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="text-white bg-dark ml-1"
              style={{ borderRadius: "2px" }}
            >
              SEARCH
            </button>
            <div className="container">
              <div className="row">
                <div className="col-4 text-left text-white">
                  <label for="cars" className="mr-2">
                    FILTER BY GENDER
                  </label>

                  <select
                    value={filter}
                    onChange={(e) => handleQuery("filter", e.target.value)}
                  >
                    <option value="">None</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    class="btn bg-white rounded text-dark"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    ADD STUDENT
                  </button>
                </div>
                <div className="col-4 text-right text-white">
                  <label for="cars" className="mr-2">
                    SORT BY AGE
                  </label>
                  <select
                    name="sort"
                    id="sort"
                    onChange={(e) => handleQuery("sort", e.target.value)}
                    value={sort}
                  >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {student && student.studentImage && (
          <div className="row">
            <div className="col-4 mx-auto">
              <div class="card">
                <img
                  class="card-img-top  border-none"
                  src={student.studentImage}
                  alt="card"
                  style={{ height: "350px" }}
                />
                <div class="card-body">
                  <h5 class="card-title">{student.studentName}</h5>
                  <h6 class="card-title">Gender: {student.gender}</h6>

                  <h6 class="card-title">Tests: {student.tests.length}</h6>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
