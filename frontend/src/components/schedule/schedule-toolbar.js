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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import AddIcon from '@mui/icons-material/Add';
import { display } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export const ScheduleToolbar = (props) => {
  const [valueDateFrom, setValueDateFrom] = useState(null);
  const [valueDateTo, setValueDateTo] = useState(null);
  const [birthDay, setBirthDay] = useState(null);
  const [sex, setSex] = useState('');

  const handleChangeDate = (event) => {
    setDateSelect(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonthSelect(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYearSelect(event.target.value);
  };

  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      birthday: '',
      sex: 'name',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(50)
        .required('Họ tên là bắc buộc'),
      birthday: Yup.date()
        .required('Vui lòng chọn ngày sinh'),
      sex: Yup
        .string()
        .required(
        'Vui lòng chọn giới tính'
      ),
      phone: Yup
        .string()
        .max(10, 'Số điện thoại 10 ký tự')
        .required('Vui lòng nhập số điện thoại')
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
            Thông tin bệnh nhân
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              spacing={3}
            >
              <Grid item sm={6}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    name="name"
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    fullWidth id="standard-basic" label="Họ tên" required variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <DatePicker
                    error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                    helperText={formik.touched.birthday && formik.errors.birthday}
                    onBlur={formik.handleBlur}
                    onChange={(selectDate) => setBirthDay(selectDate)}
                    name="birthday"
                    label="Ngày sinh"
                    value={birthDay}
                    renderInput={(params) => <TextField 
                    variant="standard" {...params} />}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField fullWidth id="standard-basic" label="Địa chỉ" variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField fullWidth id="standard-basic" label="Nghề nghiệp" variant="standard" />
                </Box>
                <Button variant="contained" type="submit" onClick={formik.handleSubmit} startIcon={<AddIcon />}>Thêm</Button>
              </Grid>
              <Grid item sm={6}>
                <Box sx={{ mb: 3 }}>
                  <TextField name="aliases" fullWidth id="standard-basic" label="Bí danh" variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel id="simple-select-year-label">Giới tính *</InputLabel>
                    <Select
                      labelId="simple-select-sex-label"
                      id="simple-select-sex"
                      onChange={handleChangeSex}
                      label="Giới tính"
                    >
                      <MenuItem value="nam">Nam</MenuItem>
                      <MenuItem value="nu">Nữ</MenuItem>
                      <MenuItem value="khac">Khác</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField 
                    name="phone"
                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    fullWidth 
                    id="standard-basic" 
                    label="Điện thoại" 
                    required 
                    variant="standard" />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}
