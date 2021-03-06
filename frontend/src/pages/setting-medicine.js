import { Box, Container } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SettingMedicineListResults } from "src/components/settings/medicine/medicine-list-results";
import { DashboardLayout } from "../components/dashboard-layout";

const MedicineSetting = () => {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [medicines, setMedicines] = useState([]);
  
  useEffect(() => {
    const fetchData =  () => {
      try {
        axios.get('/api/categories').then(response => {
          if (response.data.responsive.status === 'success') {
            setCategories([...response.data.data]);
          } else {
            setError(response.data.message);
          }
        });
        axios.get('/api/units').then(response => {
          if (response.data.responsive.status === 'success') {

            setUnits([...response.data.data]);
          } else {
            setError(response.data.message);
          }
        });

        axios.get('/api/medicines').then(response => {
          if (response.data.responsive.status === 'success') {
            setMedicines([...response.data.data]);
          } else {
            setError(response.data.message);
          }
        })
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, []);
  
  return (<>
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
          <SettingMedicineListResults medicines={medicines}
categories={categories}
units={units}/>
      </Container>
    </Box>
  </>)
};
MedicineSetting.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MedicineSetting;
