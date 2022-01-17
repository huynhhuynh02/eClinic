import {
  Box,
  Button,
  Grid,
  Container,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  Card
} from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { display } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export const SettingClinicInformationToolbar = (props) => {
  // const [valueClinicName, setClinicName] = useState(null);
  // const [valueClinicPhoneNumber, setClinicPhoneNumber] = useState(null);
  // const [valueClinicEmail, setClinicEmail] = useState(null);
  // const [valueClinicAddress, setClinicAddress] = useState(null);

  // const handleChangeSex = (event) => {
  //   setSex(event.target.value);
  // };

  const Input = styled('input')({
    display: 'none',
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      phone_number: '',
      email: '',
      address: ''
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(500)
        .required('Tên phòng khám là bắt buộc'),
      phone_number: Yup
        .string()
        .max(10, 'Số điện thoại 10 ký tự')
        .required('Vui lòng nhập số điện thoại hợp lệ'),
      email: Yup.string()
        .required(
        'Vui lòng nhập email'
      ),
      address: Yup
        .string()
        .max(500)
        .required('Vui lòng nhập địa chỉ liên lạc')
    }),
    handleSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Typography
            sx={{ m: 1 }}
            variant="h6"
          >
            Thông tin phòng khám
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              spacing={3}
            >
              <Grid item sm={12}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    name="name"
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    fullWidth id="standard-basic" label="Tên phòng khám" required variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField 
                    name="phone_number"
                    error={Boolean(formik.touched.phone_number && formik.errors.phone_number)}
                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                    fullWidth 
                    id="standard-basic" 
                    label="Điện thoại" 
                    required 
                    variant="standard" />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField 
                    name="email"
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    fullWidth 
                    id="standard-basic" 
                    label="Email" 
                    required 
                    variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField 
                    name="address"
                    error={Boolean(formik.touched.address && formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    fullWidth 
                    id="standard-basic" 
                    label="Địa chỉ" 
                    required 
                    variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <label htmlFor="icon-button-file">
                  <Typography>Logo</Typography>
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCameraIcon />
                    </IconButton>
                  </label>
                </Box>
                <Grid container spacing={3} justifyContent="flex-end"> 
                  <Box sx={{ m: 1 }}>
                    <Button sx={{ mr: 1 }} variant="outlined" type="reset" onClick={formik.handleReset} startIcon={<AutorenewIcon />}>Nhập lại</Button>
                    <Button sx={{ mr: 1 }} variant="contained" type="submit" onClick={formik.handleSubmit} startIcon={<AddIcon />}>Lưu</Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}
