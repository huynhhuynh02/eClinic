import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ScheduleListResults } from '../components/schedule/schedule-list-results';
import { ScheduleToolbar } from '../components/schedule/schedule-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { schedules } from '../__mocks__/schedules';

const Schedule = () => (
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
        <ScheduleToolbar />
        <Box sx={{ mt: 3 }}>
          <ScheduleListResults schedules={schedules} />
        </Box>
      </Container>
    </Box>
  </>
);
Schedule.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Schedule;
