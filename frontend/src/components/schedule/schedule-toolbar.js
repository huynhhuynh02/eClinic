import {
  Box,
  Button,
  Card,
  Grid,
  Container,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { useState } from 'react';
import { Search as SearchIcon } from '../../icons/search';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export const ScheduleToolbar = (props) => {
  const [valueDateFrom, setValueDateFrom] = useState(null);
  const [valueDateTo, setValueDateTo] = useState(null);
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
      <Box sx={{ mt: 3 }}>
        <Container maxWidth="lg">
          <Grid
            container
          >
            <Grid item sm={4}>
              <Box sx={{ mb: 5 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Từ ngày"
                    value={valueDateFrom}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Đến ngày"
                    value={valueDateTo}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
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
                    defaultValue={ 0 }
                    inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value={0}>Chọn nhóm bệnh nhân</option>
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <TextField fullWidth id="standard-basic" label="Nhập tên hoặc sđt" variant="standard" />
            </Grid>
            <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Button variant="contained">Tìm kiếm</Button>
            </Grid>
          </Grid>
        </Container> 
      </Box>
    </Box>
  );
}
