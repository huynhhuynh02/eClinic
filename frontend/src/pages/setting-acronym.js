import { Box, Container } from "@mui/material";
import Head from "next/head";
import AcronymCategory from "src/components/settings/acronym/acronym-list-results";
import { acronyms } from "src/__mocks__/acronyms";
import { DashboardLayout } from "../components/dashboard-layout";

const AcronymSetting = () => (
  <>
    <Head>
      <title>Cấu hình từ viết tắt | TAPA App</title>
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
          <AcronymCategory acronyms={acronyms} />
        </Box>
      </Container>
    </Box>
  </>
);
AcronymSetting.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AcronymSetting;
