import {
  Box,
  Button,
  Grid,
  CardContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  Card
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import schedulesService from '../../apis/schedules.api';
import { useEffect, useState } from 'react';
import { getCity, getDisTrict, getWard } from 'src/apis/province.api';

export const ScheduleToolbar = (props) => {
  const [cities,setCities] = useState([]);
  const [cityCode,setCityCode] = useState('');
  const [district,setDistrict] = useState([]);
  const [districtCode,setDistrictCode] = useState('');
  const [ward,setWard] = useState([]);
  const [wardCode,setWardCode] = useState('');
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      fullname: '',
      birthday: moment(new Date).format("YYYY-MM-DD"),
      aliases: '',
      sex: '0',
      address:'',
      phone: '',
      job: '',
    },
    validationSchema: Yup.object({
      fullname: Yup
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
        .string().matches(phoneRegExp, 'Phone number is not valid')
        .max(10, 'Số điện thoại 10 ký tự')
        .required('Vui lòng nhập số điện thoại')
    }),
    onSubmit: (values) => {
      values['city_code'] = cityCode;
      values['district_code'] = districtCode;
      values['ward_code'] = wardCode;
      schedulesService.addSchedules(values).then(res=>{
        if (res.status === 200) {
          props.handlePage();
        }else {
          alert("Tạo lịch khám thất bại!");
        }
      })
    }
  });

  useEffect(()=> {
    const fetchData =  () => {
      try {
        getCity().then(response => {
          if(response.status == 200 && response.data) {
            setCities(response.data.city)
          }
        });
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  },[])

  const handleChangeAddress= (e, type) => {
      try {
        switch (type) {
          case 'city':
            setCityCode(e.target.value);
            getDisTrict(e.target.value).then(response => {
              if(response.status == 200 && response.data) {
                setDistrict(response.data.districts);
                setWardCode([])
              }
            });
            break;
          case 'district':
            setDistrictCode(e.target.value);
            getWard(e.target.value).then(response => {
              if(response.status == 200 && response.data) {
                setWard(response.data.wards)
              }
            });
            break;
          case 'ward':
            setWardCode(e.target.value);
            break;
          default:
            break;
        }
      } catch (e) {
        setError(e);
      }
  }

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
          <form onSubmit={(e)=>{
            e.preventDefault();
            formik.handleSubmit()}}
            >
            <Grid
              container
              spacing={3}
            >
              <Grid item sm={6}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    name="fullname"
                    error={Boolean(formik.touched.fullname && formik.errors.fullname)}
                    helperText={formik.touched.fullname && formik.errors.fullname}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fullname}
                    fullWidth id="standard-basic" label="Họ tên *" variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <DatePicker
                    error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                    helperText={formik.touched.birthday && formik.errors.birthday}
                    onBlur={formik.handleBlur}
                    onChange={(selectDate) => formik.setFieldValue("birthday", moment(selectDate).format("YYYY-MM-DD"))}
                    name="birthday"
                    label="Ngày sinh *"
                    value={formik.values.birthday}
                    renderInput={(params) => <TextField
                    variant="standard" {...params} />}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="standard-basic"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    fullWidth 
                    label="Địa chỉ"
                    variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="standard-basic"
                    name="job"
                    value={formik.values.job}
                    onChange={formik.handleChange}
                    label="Nghề nghiệp"
                    fullWidth
                    variant="standard" />
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="standard-basic"
                    name="aliases"
                    value={formik.values.aliases}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Bí danh"
                    variant="standard" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel id="simple-select-year-label">Giới tính</InputLabel>
                    <Select
                      labelId="simple-select-sex-label"
                      id="simple-select-sex"
                      onChange={formik.handleChange}
                      label="Giới tính"
                      name='sex'
                      value={formik.values.sex}
                    >
                      <MenuItem value="0">Nam</MenuItem>
                      <MenuItem value="1">Nữ</MenuItem>
                      <MenuItem value="2">Khác</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="standard-basic" 
                    name="phone"
                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    fullWidth 
                    label="Điện thoại *" 
                    variant="standard" />
                </Box>
                <Grid container spacing={3}>
                  <Grid item sm={6} md={4}>
                    <FormControl variant="standard" sx={{ minWidth: 140 }}>
                      <InputLabel id="simple-select-year-label">Thành phố/Tỉnh</InputLabel>
                      <Select
                        labelId="simple-select-city-label"
                        id="simple-select-city"
                        onChange={(e)=>handleChangeAddress(e,'city')}
                        label="Thành Phố/Tỉnh"
                        name='city'
                        value={cityCode}
                      >
                        {
                          cities ? cities.map((data)=><MenuItem value={data.code}>{data.name}</MenuItem> ) : ""
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}  md={4}>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel id="simple-select-district-label" >Quận/Huyện</InputLabel>
                      <Select
                        labelId="simple-select-district-label"
                        id="simple-select-district"
                        onChange={(e)=>handleChangeAddress(e,'district')}
                        label="Quận/Huyện"
                        name='district'
                        value={districtCode}
                      >
                        {
                          district ? district.map((data)=><MenuItem value={data.code}>{data.name}</MenuItem> ) : ""
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={4}>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel id="simple-select-ward-label">Phường/Xã</InputLabel>
                      <Select
                        labelId="simple-select-ward-label"
                        id="simple-select-ward"
                        onChange={(e)=>handleChangeAddress(e,'ward')}
                        label="Phường/Xã"
                        name='ward'
                        value={wardCode}
                      >
                        {
                          ward ? ward.map((data)=><MenuItem value={data.code}>{data.name}</MenuItem> ) : ""
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button variant="contained" type="submit" startIcon={<AddIcon />}>Thêm</Button>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}
