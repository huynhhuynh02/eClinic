import {
  Box,
  Button,
  Grid,
  Container,
  TextField, 
  Typography
} from '@mui/material';
import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export const ScheduleToolbar = (props) => {
  const [valueDateFrom, setValueDateFrom] = useState(null);
  const [valueDateTo, setValueDateTo] = useState(null);
  const [valueTypeCustomer, setValueTypeCustomer] = useState(0);
  const [valuePhone, setValuePhone] = useState(null);
  function sendData () {
    props.getDataFormSearch(valueDateFrom, valueDateTo, valueTypeCustomer, valuePhone);
  }
  return (
    <Box {...props}>
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
          variant="h4"
        >
          Danh sách lịch hẹn
        </Typography>
      </Box>
      <Box sx={{ mt: 3, mb: 5, bgcolor: 'white', py: 3, boxShadow: 3 }}>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
          >
            <Grid item sm={4}>
              <Box sx={{ mb: 5 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    renderInput={(props) => <TextField sx={{ width: "100%" }} {...props} />}
                    label="Từ ngày"
                    value={valueDateFrom}
                    onChange={(value) => setValueDateFrom(value)}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    renderInput={(props) => <TextField sx={{ width: "100%" }} {...props} />}
                    label="Đến ngày"
                    value={valueDateTo}
                    onChange={(value) => setValueDateTo(value)}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item sm={ 5 }>
              <Grid mb={ 5 }>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Nhóm bệnh nhân
                  </InputLabel>
                  <NativeSelect
                    defaultValue={ valueTypeCustomer }
                    inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}
                    onChange={ (e) => setValueTypeCustomer(e.target.value) }
                  >
                    <option value={0}>Chọn nhóm bệnh nhân</option>
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <TextField fullWidth onChange={ (e) => setValuePhone(e.target.value) } value={ valuePhone } id="standard-basic" label="Nhập tên hoặc sđt" variant="standard" />
            </Grid>
            <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Button onClick={ sendData } variant="contained">Tìm kiếm</Button>
            </Grid>
          </Grid>
        </Container> 
      </Box>
    </Box>
  );
}
