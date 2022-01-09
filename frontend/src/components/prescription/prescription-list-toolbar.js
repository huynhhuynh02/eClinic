import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const PrescriptionListToolbar = (props) => {
  const [valueDateFrom, setValueDateFrom] = useState(null);
  const [valueDateTo, setValueDateTo] = useState(null);
  const [searchTextInput, setSearchTextInput] = useState("");
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }}
          variant="h4">
          Danh sách đơn thuốc
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid container >
          <Grid
            item
            xs={3}>
            <Box sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField fullWidth {...props} variant="standard" />}
                  variant="standard"
                  label="Từ ngày"
                  value={valueDateFrom}
                  inputFormat="dd/MM/yyyy"
                  hideTabs={true}
                  onChange={(newValue) => {
                    setValueDateFrom(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Box sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField fullWidth {...props} variant="standard" />}
                  label="Đến ngày"
                  value={valueDateTo}
                  onChange={(newValue) => {
                    setValueDateTo(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Box sx={{ m: 1 }}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Nhập mã đơn hoặc tên bệnh nhân"
                variant="standard"
                placeholder="Nhập mã đơn hoặc tên bệnh nhân"
                value={searchTextInput}
                onChange={(e) => {
                  setSearchTextInput(e.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            sm={3}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Box sx={{ m: 1 }}>
              <Button variant="contained">Tìm kiếm</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
