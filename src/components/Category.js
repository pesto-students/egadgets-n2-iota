import React from "react";
import { useDispatch } from "react-redux";
import { getCategoryData } from "../actions/CategoryAction";

function Category() {
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <button onClick={() => dispatch(getCategoryData())}>Hit Api</button>
      </div>
    </>
  );
}

export default Category;
