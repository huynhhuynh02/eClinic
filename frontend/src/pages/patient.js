import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { PatientListResults } from '../components/patient/patient-list-results';
import { PatientListToolbar } from '../components/patient/patient-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';
import schedulesService from '../apis/schedules.api';
import { useEffect, useState } from 'react';


const Patients = () => {

  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schedulesMeta, setSchedulesMeta] = useState();

  const onReload = () => {
    schedulesService.getSchedules().then(res => {
      setIsLoading(true);
      setSchedules(res.data);
      setSchedulesMeta(res.meta);
    })
  }

  const handlePage = async (perPage, page) => {
    schedulesService.getSchedules(perPage, page + 1).then(res => {
      setIsLoading(true);
      setSchedules(res.data);
      setSchedulesMeta(res.meta);
    })
  }

  useEffect(() => {
    schedulesService.getSchedules().then(res => {
      setIsLoading(true);
      setSchedules(res.data);
    })
  },[])

  return (
    <>
      <Head>
        <title>
          Danh sách khám bệnh | TAPA App
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
          <PatientListToolbar />
          <Box sx={{ mt: 3 }}>
            {isLoading ? <PatientListResults 
              pager={schedulesMeta}
              handlePage={handlePage} 
              onReload={onReload} 
              schedules={schedules} /> : 'Loading ...' }
          </Box>
        </Container>
      </Box>
    </>
  )
};

Patients.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Patients;
