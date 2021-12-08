import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { medicine_category_group } from "src/__mocks__/category_group";
import { units } from "src/__mocks__/unit";

export const SettingMedicineToolbar = (props) => {
  const [expiredDate, setExpiredDate] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [price, setPrice] = useState(0);

  const handleChangeDate = (event) => {
    console.log(event);
    setExpiredDate(event?.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeCategoryId = (event) => {
    setCategoryId(event.target.value);
  };

  const handleChangeUnitId = (event) => {
    setUnitId(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

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
            Thông tin thuốc
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Tên thuốc *"
              variant="standard"
              value={name}
              onChange={handleChangeName}
            />
          </Box>
          <Grid container spacing={3}>
            <Grid item sm={4}>
              <Box sx={{ mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    renderInput={(props) => <TextField fullWidth {...props} variant="standard" />}
                    variant="standard"
                    label="Ngày hết hạn *"
                    value={expiredDate}
                    inputFormat="dd/MM/yyyy"
                    hideTabs={true}
                    onChange={handleChangeDate}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item sm={4}>
              <Box sx={{ mb: 3 }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="simple-select-year-label">Danh mục thuốc</InputLabel>
                  <Select
                    labelId="simple-select-sex-label"
                    id="simple-select-sex"
                    value={categoryId}
                    onChange={handleChangeCategoryId}
                    label="Danh mục thuốc *"
                  >
                    {medicine_category_group.map((cate) => (
                      <MenuItem key={cate.id} value={cate.id}>
                        {" "}
                        {cate.name}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {/* <Grid item sm={2}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  id="standard-number"
                  label="Giá"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  value={price}
                  onChange={handleChangePrice}
                />
              </Box>
            </Grid> */}
            <Grid item sm={4}>
              <Box sx={{ mb: 3 }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="simple-select-year-label">Đơn vị tính</InputLabel>
                  <Select
                    labelId="simple-select-sex-label"
                    id="simple-select-sex"
                    value={unitId}
                    onChange={handleChangeUnitId}
                    label="Đơn vị tính *"
                  >
                    {units.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mb: 5 }}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Mô tả"
              variant="standard"
              value={description}
              onChange={handleChangeDescription}
            />
          </Box>

          <Button
            variant="contained"
            disabled={
              name.trim().length === 0 ||
              expiredDate?.length === 0 ||
              categoryId.length === 0 ||
              unitId.length === 0
            }
          >
            Thêm
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
