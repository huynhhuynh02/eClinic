import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';


export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';

  return (
    <Typography variant="h4" component="h4">
      T A P A
    </Typography>
  );
})``;

Logo.defaultProps = {
  variant: 'primary'
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary'])
};
