import {
  Box,
  Grid,
  TextField,
  Button
} from '@mui/material';
import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import { ScheduleFormAdd } from './schedule-form-add';

export const ScheduleToolbar = (props) => { 
  const [value, setValue] = useState(new Date());
  const [openFormAdd, setOpenFormAdd] = useState({ open: false, formType: 'Examination' });
  return (
    <>
      <Box >
        <Grid container>
          <Grid item xs={ 7 } sx={{ bgcolor: '#fff', p: 2 }}>
            <TextField fullWidth onChange={ (e) => props.searchPatients(e.target.value) } label="Tìm lịch khám (Nhập tên hoặc số điện thoại bệnh nhân)" id="fullWidth" />
          </Grid>
          <Grid item xs={ 5 } sx={{ bgcolor: '#fff', p: 2, display: 'flex', justifyContent: 'space-between', border: 1, borderColor: 'primary.main', borderRadius: '16px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button variant="contained" onClick={ () => setOpenFormAdd({ open: true, formType: 'Examination' }) }>
              Tạo lịch khám
            </Button>
          </Grid>
        </Grid>
        <ScheduleFormAdd getSchedules={ props.getSchedules } handleClose={ () => setOpenFormAdd({ open: false, formType: 'Examination' }) } openFormAdd={ openFormAdd }/>
      </Box>
    </>
  );
}
