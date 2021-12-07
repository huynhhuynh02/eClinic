import { Box, Container } from "@mui/material";
import Head from "next/head";
import MedicalCategoryGroup from "src/components/settings/category/medical_category_group";
import { medicine_category_group } from "src/__mocks__/category_group";
import { DashboardLayout } from "../components/dashboard-layout";

const SettingMedicineCategoryGroup = () => (
  <>
    <Head>
      <title> Cấu hình danh mục nhóm thuốc | TAPA App</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container>
        <Box sx={{ mt: 3 }}>
          <MedicalCategoryGroup medicineCategories={medicine_category_group} />
        </Box>
      </Container>
    </Box>
  </>
);
SettingMedicineCategoryGroup.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SettingMedicineCategoryGroup;
