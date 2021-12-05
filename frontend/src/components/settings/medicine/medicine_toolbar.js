import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

export const SettingMedicineToolbar = (props) => {
  const [valueDateFrom, setValueDateFrom] = useState(null);
  const [valueDateTo, setValueDateTo] = useState(null);
  const [dateSelect, setDateSelect] = useState("");
  const [monthSelect, setMonthSelect] = useState("");
  const [yearSelect, setYearSelect] = useState("");
  const [sex, setSex] = useState("");

  const handleChangeDate = (event) => {
    setDateSelect(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonthSelect(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYearSelect(event.target.value);
  };

  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };

  var date = [];
  var month = [];
  var year = [];
  var currentYear = new Date().getFullYear();
  for (let i = 1; i <= 31; i++) {
    date.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    month.push(i);
  }

  for (let i = currentYear - 100; i <= currentYear; i++) {
    year.push(i);
  }

  const renderDate = date.map((index) => {
    return (
      <MenuItem key={"date" + index} value={index}>
        {index}
      </MenuItem>
    );
  });

  const renderMonth = month.map((index) => {
    return (
      <MenuItem key={"month" + index} value={index}>
        {index}
      </MenuItem>
    );
  });

  const renderYear = year.map((index) => {
    return (
      <MenuItem key={"year" + index} value={index}>
        {index}
      </MenuItem>
    );
  });

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h6">
            Thông tin bệnh nhân
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <Box sx={{ mb: 5 }}>
                <TextField fullWidth id="standard-basic" label="Họ tên *" variant="standard" />
              </Box>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Ngày sinh
              </InputLabel>
              <Box sx={{ mb: 3 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="simple-select-date-label">Ngày</InputLabel>
                  <Select
                    labelId="simple-select-date-label"
                    id="simple-select-date"
                    value={dateSelect}
                    onChange={handleChangeDate}
                    label="Ngày"
                  >
                    {renderDate}
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="simple-select-month-label">Tháng</InputLabel>
                  <Select
                    labelId="simple-select-month-label"
                    id="simple-select-month"
                    value={monthSelect}
                    onChange={handleChangeMonth}
                    label="Tháng"
                  >
                    {renderMonth}
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="simple-select-year-label">Tháng</InputLabel>
                  <Select
                    labelId="simple-select-year-label"
                    id="simple-select-year"
                    value={yearSelect}
                    onChange={handleChangeYear}
                    label="Tháng"
                  >
                    {renderYear}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField fullWidth id="standard-basic" label="Địa chỉ" variant="standard" />
              </Box>
              <Box sx={{ mb: 5 }}>
                <TextField fullWidth id="standard-basic" label="Nghề nghiệp" variant="standard" />
              </Box>
              <Button variant="contained">Thêm</Button>
            </Grid>
            <Grid item sm={6}>
              <Box sx={{ mb: 8 }}>
                <TextField fullWidth id="standard-basic" label="Bí danh" variant="standard" />
              </Box>
              <Box sx={{ mb: 3 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="simple-select-year-label">Giới tính</InputLabel>
                  <Select
                    labelId="simple-select-sex-label"
                    id="simple-select-sex"
                    value={sex}
                    onChange={handleChangeSex}
                    label="Giới tính"
                  >
                    <MenuItem value={0}>Nam</MenuItem>
                    <MenuItem value={1}>Nữ</MenuItem>
                    <MenuItem value={2}>Khác</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mb: 8 }}>
                <TextField fullWidth id="standard-basic" label="Điện thoại" variant="standard" />
              </Box>
              <Box>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Nhóm bệnh nhân
                </InputLabel>
                <FormGroup
                  sx={{
                    display: "flex",
                  }}
                >
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Nha Khoa" />
                  <FormControlLabel control={<Checkbox />} label="Nội khoa" />
                  <FormControlLabel control={<Checkbox />} label="Ngoại Khoa" />
                </FormGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
