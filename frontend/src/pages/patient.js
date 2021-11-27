import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { PatientListResults } from '../components/patient/patient-list-results';
import { PatientListToolbar } from '../components/patient/patient-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { patients } from '../__mocks__/patients';

const Patients = () => (
  <>
    <Head>
      <title>
        Bệnh nhân | TAPA App
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
        <PatientListToolbar />
        <Box sx={{ mt: 3 }}>
          <PatientListResults patients={patients} />
        </Box>
      </Container>
    </Box>
  </>
);
Patients.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Patients;
