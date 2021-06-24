import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

function ProductsSkeleton({ count = 4, column = 3 }) {
  return (
    <Grid
      container
      spacing={2}
      style={{ marginTop: '20px', marginBottom: '20px' }}
    >
      {Array.from(Array(count).keys()).map((x) => (
        <Grid item md={column} lg={column} sm={6} xs={6} key={x}>
          <Skeleton variant="rect" height={200} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton
            variant="rect"
            height={40}
            style={{ marginTop: '10px', borderRadius: '20px' }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsSkeleton;
