import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function MultiCheckFilter({ items }) {
  return (
    <>
      {items.map((item) => (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color="default" />}
            label={item.name}
          />
        </FormGroup>
      ))}
    </>
  );
}

export default MultiCheckFilter;
