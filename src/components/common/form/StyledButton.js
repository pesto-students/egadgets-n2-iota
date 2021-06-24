import React from 'react';
import '../../../styles/components/FormStyle.css';

function StyledButton({
  text = 'Add to cart',
  customStyle,
  onHandleClick = null,
  loading = false,
  disabled = false,
}) {
  return (
    <button
      className="styled-button"
      style={customStyle}
      onClick={onHandleClick}
      disabled={disabled}
    >
      {loading ? 'Please wait' : text}
    </button>
  );
}

export default StyledButton;
