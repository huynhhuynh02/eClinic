import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';
import { patients } from '../__mocks__/patients';
import { useEffect, useState } from 'react';
import { PrescriptionListToolbar } from 'src/components/prescription/prescription-list-toolbar';
import PrescriptionListResults from 'src/components/prescription/prescription-list-results';
import {getAllPrescription} from '../apis/prescription.api';


const Prescriptions = () => {

  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllPrescription().then(result => {
      setIsLoading(true);
      setPrescriptions([...result.data.data]);
    });
  },[])

  return (
    <>
      <Head>
        <title>
          Đơn thuốc | TAPA App
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
          <PrescriptionListToolbar />
          <Box sx={{ mt: 3 }}>
            {isLoading ? <PrescriptionListResults prescriptions={prescriptions} /> : 'Loading ...' }
          </Box>
        </Container>
      </Box>
    </>
  )
};

Prescriptions.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Prescriptions;
