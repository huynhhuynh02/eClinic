import Head from 'next/head';
import { Box, Container, Grid} from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { TotalCustomers } from 'src/components/dashboard/total-customers';
import { TotalProfit } from 'src/components/dashboard/total-profit';
import { Budget } from 'src/components/dashboard/budget';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Statistical() {
  const labels = ['Thu 2', 'Thu 3', 'Thu 4', 'Thu 5', 'Thu 6', 'Thu 7', 'Chu nhat'];
  const data = {
    labels,
    datasets: [
      {
        label: 'so luot kham',
        data: labels.map(() => 100),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'luot kham 7 ngay gan nhat',
      },
    },
  };
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
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
          </Grid>
          <Box marginTop={2}>
            <h1>Bieu do</h1>
          </Box>
          <Box marginTop={2}>
            <h4>Luot kham</h4>
          </Box>
          <Box>
            <Line
              options={options} data={data}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Statistical.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Statistical;
