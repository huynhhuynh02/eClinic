import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SettingMedicineListResults } from "src/components/settings/medicine/medicine-list-results";
import { getAllCategory } from '../apis/category.api';
import { getAllMedicines } from '../apis/medicines.api';
import { getAllUnit } from '../apis/unit.api';
import { DashboardLayout } from "../components/dashboard-layout";

const MedicineSetting = () => {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [meta, setMeta] = useState();

  const fetData = (dataRes) => {
    setMedicines(dataRes.data);
    setMeta(dataRes.meta);
  }
  const handlePageChange = async (perPage, page) => {
    getAllMedicines(perPage, page+1).then(response => {
      if (response.data.responsive.status === 'success') {
        fetData(response.data);
      } else {
        setError(response.data.message);
      }
    })
  }
  
  useEffect(() => {
    const fetchData =  () => {
      try {
        getAllCategory().then(response => {
          if (response.data.responsive.status === 'success') {
            setCategories([...response.data.data]);
          } else {
            setError(response.data.message);
          }
        });
        getAllUnit().then(response => {
          if (response.data.responsive.status === 'success') {

            setUnits([...response.data.data]);
          } else {
            setError(response.data.message);
          }
        });

        getAllMedicines().then(response => {
          if (response.data.responsive.status === 'success') {
            // setMedicines([...response.data.data]);
            fetData(response.data);
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
          units={units}
          pager={meta}
          handlePage={handlePageChange}
        />
      </Container>
    </Box>
  </>)
};
MedicineSetting.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MedicineSetting;
