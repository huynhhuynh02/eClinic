import Head from 'next/head';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { TotalPrescriptions } from "../components/dashboard/total-prescription";
import { TotalPatients } from '../components/dashboard/total-patient'
import { TotalReceipts } from "../components/dashboard/total-receipt";
import { TotalProfit } from "../components/dashboard/total-profit";
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
import { Line } from 'react-chartjs-2';
import statisticalService from 'src/apis/statistical.api';
import { useEffect, useState } from 'react';
import { grid } from '@mui/system';

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
  const [datePatient, setDatePatient] = useState([]);
  const [dataPatient, setDataPatient] = useState([]);
  const [datePrescription, setDatePrescription] = useState([]);
  const [dataPrescription, setDataPrescription] = useState([]);
  const [typePatient, setTypePatient] = useState("week");
  const [typePrescription, setTypePrescription] = useState("week");
  useEffect(async () => {
    if (dataPatient !== statisticalService.getStatisticalPatient()) {
      const data = await statisticalService.getStatisticalPatient(typePatient);
      fetDataPatient(data);
    }
  }, [typePatient]);

  useEffect(async () => {
    if (dataPrescription !== statisticalService.getStatisticalPrescription()) {
      const data = await statisticalService.getStatisticalPrescription(typePrescription);
      fetDataPrescription(data);
    }
  }, [typePrescription]);

  const fetDataPrescription = (dataRes) => {
    if (dataRes.data) {
      setDatePrescription(dataRes.data.date);
      setDataPrescription(dataRes.data.data);
    }
  }
  const fetDataPatient = (dataRes) => {
    if (dataRes.data) {
      setDatePatient(dataRes.data.date);
      setDataPatient(dataRes.data.data);
    }
  }
  const labels = datePatient ? datePatient : [];
  const dataPatientChar = {
    labels,
    datasets: [
      {
        label: 'Bệnh nhân',
        data: dataPatient ? dataPatient.map((data) => data) : 0,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ],
  };

  const optionsPatient = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Số bệnh nhân'
      },
    },
    scales: {
      y: {
        min: 0,
      }
    }
  };

  const labelsPrescription = datePrescription ? datePrescription : [];
  const dataPrescriptionChar = {
    labels: labelsPrescription,
    datasets: [
      {
        label: 'Đơn Thuốc',
        data: dataPrescription ? dataPrescription.map((data) => data) : 0,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const optionsPrescription = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Số Đơn Thuốc'
      },
    },
    scales: {
      y: {
        min: 0,
      }
    }
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
              <TotalPatients />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalPrescriptions />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalReceipts sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
          </Grid>
          <Grid container marginTop={2} spacing={2}>
            <Grid item md={6} xs={12}>
              <h3>Bệnh Nhân</h3>
              <Box marginTop={2}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Theo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typePatient}
                    label="Age"
                    onChange={(e) => { setTypePatient(e.target.value) }}
                  >
                    <MenuItem value="week">Tuần</MenuItem>
                    <MenuItem value="month">Tháng</MenuItem>
                  </Select>
                </FormControl>
                <Line
                  options={optionsPatient} data={dataPatientChar}
                />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <h3>Đơn Thuốc</h3>
              <Box marginTop={2}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Theo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typePrescription}
                    label="Age"
                    onChange={(e) => { setTypePrescription(e.target.value) }}
                  >
                    <MenuItem value="week">Tuần</MenuItem>
                    <MenuItem value="month">Tháng</MenuItem>
                  </Select>
                </FormControl>
                <Line
                  options={optionsPrescription} data={dataPrescriptionChar}
                />
              </Box>
            </Grid>
          </Grid>
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
