import { Box, Container } from "@mui/material";
import Head from "next/head";
import { SettingMedicineListResults } from "src/components/settings/medicine-list-results";
import { SettingMedicineToolbar } from "src/components/settings/medicine/medicine_toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { patients } from "../__mocks__/patients";

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
          <SettingMedicineListResults medicines={patients} />
        </Box>
      </Container>
    </Box>
  </>
);
MedicineSetting.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MedicineSetting;
