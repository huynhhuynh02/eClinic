import { Box, Container } from "@mui/material";
import Head from "next/head";
import { SettingMedicineListResults } from "src/components/settings/medicine/medicine-list-results";
import { SettingMedicineToolbar } from "src/components/settings/medicine/medicine_toolbar";
import { medicines } from "src/__mocks__/medicines";
import { DashboardLayout } from "../components/dashboard-layout";

const MedicineSetting = () => (
  <>
    <Head>
      <title>Cấu hình thuốc | TAPA App</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container>
        <SettingMedicineToolbar />
        <Box sx={{ mt: 3 }}>
          <SettingMedicineListResults medicines={medicines} />
        </Box>
      </Container>
    </Box>
  </>
);
MedicineSetting.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MedicineSetting;
