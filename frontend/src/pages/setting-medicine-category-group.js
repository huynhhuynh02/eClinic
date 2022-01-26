import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import MedicalCategoryGroup from "src/components/settings/category/medical_category_group";
import { getAllCategory } from '../apis/category.api';
import { DashboardLayout } from "../components/dashboard-layout";

const SettingMedicineCategoryGroup = () => {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState();

  const fetData = (dataRes) => {
    setCategories(dataRes.data);
    setMeta(dataRes.meta);
  }
  
  const handlePageChange = async (perPage, page) => {
    getAllCategory(perPage, page+1).then(response => {
      if (response.data.responsive.status === 'success') {
        fetData(response.data);
      } else {
        setError(response.data.message);
      }
    })
  }
  useEffect(() => {
    getAllCategory().then(response => {
      console.log(response)
      if (response.data.responsive.status === 'success') {
        fetData(response.data);
        // setCategories([...response.data.data]);
      } else {
        setError(response.data.message);
      }
    })
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
            <MedicalCategoryGroup medicineCategories={categories}
handlePage={handlePageChange}
pager={meta}/>
        </Box>
      </Container>
    </Box>
  </>
)};
SettingMedicineCategoryGroup.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SettingMedicineCategoryGroup;
