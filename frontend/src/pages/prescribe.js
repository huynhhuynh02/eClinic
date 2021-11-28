import { Box, Container } from "@mui/material";
import Head from "next/head";
import PrescriptionListResults from "src/components/prescription/prescription-list-results";
import { PrescriptionListToolbar } from "src/components/prescription/prescription-list-toolbar";
import { prescriptions } from "src/__mocks__/prescriptions";
import { DashboardLayout } from "../components/dashboard-layout";
const Prescriptions = () => (
  <>
    <Head>
      <title>Đơn thuốc | TAPA App</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <PrescriptionListToolbar />
        <Box sx={{ mt: 3 }}>
          <PrescriptionListResults prescriptions={prescriptions} />
        </Box>
      </Container>
    </Box>
  </>
);
Prescriptions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Prescriptions;
