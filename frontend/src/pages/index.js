import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { Budget } from "../components/dashboard/budget";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { ExaminationSchedule } from "../components/dashboard/examination-schedule";

const Dashboard = () => (
  <>
    <Head>
      <title>Dashboard | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid>
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
          sx={{
            py: 8,
          }}
        >
          <ExaminationSchedule />
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
