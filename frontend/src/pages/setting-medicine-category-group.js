import { Box, Container } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import MedicalCategoryGroup from "src/components/settings/category/medical_category_group";
import { DashboardLayout } from "../components/dashboard-layout";


const SettingMedicineCategoryGroup = () => {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        await axios.get('/api/categories').then(response => {
          if (response.data.responsive.status === 'success') {
            setCategories([...response.data.data]);
          } else {
            setError(response.data.message);
          }
        })
      } catch (e) {
        setError(e);
      }
    };
    fetchCategory();
  }, []);
  return(
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
          <MedicalCategoryGroup medicineCategories={categories} />
        </Box>
      </Container>
    </Box>
  </>
)};
SettingMedicineCategoryGroup.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SettingMedicineCategoryGroup;
