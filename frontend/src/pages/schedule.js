import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ScheduleListResults } from '../components/schedule/schedule-list-results';
import { ScheduleToolbar } from '../components/schedule/schedule-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';
import { useState } from 'react';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [keySearch, setKeySearch] = useState('');
  const getSchedules = () => {
    if (keySearch === '') {
      axios.get('/api/schedule').then(res => {
        setSchedules(res.data.schedules);
      });
    } else {
      axios.get('/api/schedule?key=' + keySearch).then(res => {
        setSchedules(res.data.schedules);
      });
    }
    
  }

  if (schedules.length === 0) {
    getSchedules();
  }

  const searchPatients = (key) => {
    setKeySearch(key);
    getSchedules();
  }
  
  return (
    <>
      <Head>
        <title>
          Schedule
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container>
          <ScheduleToolbar getSchedules={ getSchedules } searchPatients={ searchPatients }/>
          <Box sx={{ mt: 3 }}>
            <ScheduleListResults schedules={schedules} getSchedules={ getSchedules } />
          </Box>
        </Container>
      </Box>
    </>
  )
}

Schedule.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Schedule;
