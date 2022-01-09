import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ScheduleListResults } from '../components/schedule/schedule-list-results';
import { ScheduleToolbar } from '../components/schedule/schedule-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import schedulesService from 'src/apis/schedules.api';

const Schedule = () => {
  const [schedulesList, setSchedulesList] = useState([]);
  const [schedulesMeta, setSchedulesMeta] = useState();
  useEffect(async () => {
    if (schedulesList !== schedulesService.getSchedules()) {
      const data = await schedulesService.getSchedules();
      fetData(data);
    }
  }, []);

  const fetData = (dataRes) => {
    setSchedulesList(dataRes.data);
    setSchedulesMeta(dataRes.meta);
  }
  const handlePage = async (perPage, page) => {
    const data = await schedulesService.getSchedules(perPage, page + 1);
    fetData(data);
  }

  const updateScheduleTime = async (id, scheduleTime, description) => {
    await schedulesService.upadteSchedules(id, scheduleTime, description);
    const dataRes = await schedulesService.getSchedules();
    fetData(dataRes);
  }

  const deleteSchedule = async (id) => {
    console.log(id);
    await schedulesService.deleteSchedules(id);
    const dataRes = await schedulesService.getSchedules();
    fetData(dataRes);
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
          <ScheduleToolbar handlePage={handlePage} />
          <Box sx={{ mt: 3 }}>
            <ScheduleListResults
              schedules={schedulesList}
              pager={schedulesMeta}
              handlePage={handlePage}
              updateScheduleTime={updateScheduleTime}
              deleteSchedule={deleteSchedule} />
          </Box>
        </Container>
      </Box>
    </>
  )
};
Schedule.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Schedule;
