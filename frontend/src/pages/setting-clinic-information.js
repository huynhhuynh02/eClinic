import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { SettingClinicInformationToolbar } from '../components/settings/setting-clinic-information';
import { DashboardLayout } from '../components/dashboard-layout';
// import { schedules } from '../__mocks__/schedules';

//setting-clinic-information
const SettingClinicInformation = () => {
  // const [error, setError] = useState(null);
  // const [categories, setInfo] = useState([]);
  
  
  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     try {
  //       await axios.get('/api/clinic_info').then(response => {
  //         if (response.data.responsive.status === 'success') {
  //           setInfo([...response.data.data]);
  //         } else {
  //           setError(response.data.message);
  //         }
  //       })
  //     } catch (e) {
  //       setError(e);
  //     }
  //   };
  //   fetchInfo();
  // }, []);
  return(
    <>
      <Head>
        <title>
          Information
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container>
        < SettingClinicInformationToolbar/>
        {/* <Box sx={{ mt: 3 }}> */}
          {/* <ScheduleListResults schedules={schedules} /> */}
        {/* </Box> */}
      </Container>
        
      </Box>
    </>
  )};
SettingClinicInformation.getLayout = (page) => (
  <DashboardLayout>
   {page}
  </DashboardLayout>
);
export default SettingClinicInformation;
