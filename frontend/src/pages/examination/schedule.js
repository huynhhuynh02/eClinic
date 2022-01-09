import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ExaminationSchedule } from "../../components/dashboard/examination-schedule";
import { ScheduleToolbar } from '../../components/schedule/schedule-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { v4 as uuid } from "uuid";

const customers = [
  {
    id: uuid(),
    ref: "CDD1049",
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    sex: 0,
    age: "18",
    address: "123 home",
    phone: "0123123123",
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: uuid(),
    ref: "CDD1048",
    amount: 25.1,
    customer: {
      name: "Cao Yu",
    },
    sex: 1,
    age: 19,
    address: "312 Korea",
    phone: "0712638122",
    createdAt: 1555016400000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1047",
    amount: 10.99,
    customer: {
      name: "Alexa Richardson",
    },
    sex: 1,
    age: 21,
    address: "123 Canada",
    phone: "0123123123",
    createdAt: 1554930000000,
    status: "refunded",
  },
  {
    id: uuid(),
    ref: "CDD1046",
    amount: 96.43,
    customer: {
      name: "Anje Keizer",
    },
    sex: 0,
    age: 19,
    address: "123 home",
    phone: "0123123123",
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    ref: "CDD1045",
    amount: 32.54,
    customer: {
      name: "Clarke Gillebert",
    },
    sex: 1,
    age: 19,
    address: "123 home",
    phone: "0123123123",
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
    },
    sex: 1,
    age: 19,
    address: "123 home",
    phone: "0123123123",
    createdAt: 1554670800000,
    status: "delivered",
  },
];

const Schedule = () => {
  function getDataFormSearch (dateFrom, dateTo, typeCustomer, Phone) {
    console.log(dateFrom + dateTo + typeCustomer + Phone);
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
        <Container maxWidth={false}>
          <ScheduleToolbar getDataFormSearch={ getDataFormSearch }/>
          <Box sx={{ mt: 3 }}>
            <ExaminationSchedule header={ false } customers={ customers }/>
          </Box>
        </Container>
      </Box>
    </>
  );
}
Schedule.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Schedule;
