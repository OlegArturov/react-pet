import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { colors } from '../../theme/variables';
import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxWithLabel = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <StyledFormControlLabel
      control={<StyledCheckbox checked={checked} onChange={onChange} />}
      label={label}
      checked={checked}
    />
  );
};

const StyledFormControlLabel = styled(FormControlLabel, {
  shouldForwardProp: (prop) => prop !== 'checked',
})(({ checked }) => ({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  color: checked ? colors.blueMain : colors.mainText,
  margin: 0,
  width: '100%',
  height: '100%',
}));

const StyledCheckbox = styled(Checkbox)({
  color: colors.mainText,
  padding: 0,
  marginRight: '8px',
  '&.Mui-checked': {
    color: colors.blueMain,
  },
});

export default CheckboxWithLabel;
