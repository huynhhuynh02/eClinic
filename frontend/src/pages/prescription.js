import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PrescriptionListToolbar } from 'src/components/prescription/prescription-list-toolbar';
import PrescriptionListResults from 'src/components/prescription/prescription-list-results';
import {getAllPrescription} from '../apis/prescription.api';


const Prescriptions = () => {

  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionsMeta, setPrescriptionsMeta] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handlePage = async (perPage, page) => {
    getAllPrescription(perPage, page + 1).then(result => {
      setIsLoading(true);
      setPrescriptions([...result.data.data]);
      setPrescriptionsMeta(result.data.meta);
    });
  }

  useEffect(() => {
    getAllPrescription().then(result => {
      setIsLoading(true);
      setPrescriptions([...result.data.data]);
      console.log(result.data.data);
      setPrescriptionsMeta(result.data.meta);
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
            {isLoading ? <PrescriptionListResults
              prescriptions={prescriptions}
              pager={prescriptionsMeta}
              handlePage={handlePage} 
            /> : 'Loading ...' }
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
