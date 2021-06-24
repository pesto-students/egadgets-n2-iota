import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryData } from '../actions/CategoryAction';

function Category() {
  const state = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  console.log(state);

  return (
    <div>
      <button onClick={() => dispatch(getCategoryData())}>Hit Api</button>
    </div>
  );
}

export default Category;
