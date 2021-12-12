import Head from "next/head";
import { Box, Container } from "@mui/material";
import { PatientListResults } from "../components/patient/patient-list-results";
import { PatientListToolbar } from "../components/patient/patient-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { useState } from "react";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  axios
    .get("/api/patient")
    .then((res) => {
      setPatients(res.data.patients);
    })
    .catch((error) => {});
  return (
    <>
      <Head>
        <title>Danh sách khám bệnh | TAPA App</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <PatientListToolbar />
          <Box sx={{ mt: 3 }}>
            <PatientListResults patients={patients} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Patients.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Patients;
