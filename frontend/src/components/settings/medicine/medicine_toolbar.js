import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
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
  const [composition, setComposition] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [toast, setToast] = useState({
    status: "success",
    message: "Success!",
  });
  const [showToast, setShowToast] = useState(false);

  const handleChangeDate = (event) => {
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

  const handleChangeComposition = (event) => {
    setComposition(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddButton = () => {
    let input = {
      name: name.trim(),
      unit_id:unitId,
      cate_id:categoryId,
      quantity: 0,
      expired_date:expiredDate,
      description:description,
      composition:composition,
      
    }
    axios.post('/api/medicines', input).then(res => {
      if (res.data.status === 'success') {

        setName("");
        setExpiredDate(null);
        setDescription("");
        setCategoryId("");
        setUnitId("");
        setComposition("");

        handleShowToast("Thêm thành công!",res.data.status);
      } else {
        handleShowToast("Thêm không thành công",res.data.status);
      }
    })
  }

  const handleShowToast = ( message, status) => {
    toast.message = message;
    toast.status = status;
    setToast(toast);
    setShowToast(true);
  };
  
  const handleHideToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    toast.isOpen = false;
    setShowToast(false);
  };

  return (
    <>
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
          <Typography sx={{ m: 1 }}
variant="h6">
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
          <Grid container
spacing={3}>
            <Grid item
sm={3}>
              <Box sx={{ mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    renderInput={(props) => <TextField fullWidth
{...props}
variant="standard" />}
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
            <Grid item
sm={3}>
              <Box sx={{ mb: 3 }}>
                <FormControl variant="standard"
fullWidth>
                  <InputLabel id="simple-select-category-label">Danh mục thuốc *</InputLabel>
                  <Select
                    labelId="simple-select-category-label"
                    id="simple-select-category"
                    value={categoryId}
                    onChange={handleChangeCategoryId}
                    label="Danh mục thuốc*"
                  >
                    {medicine_category_group.map((cate) => (
                      <MenuItem key={cate.id}
                        value={cate.id}>
                        {cate.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item
sm={3}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  id="standard-number"
                  label="Số lượng"
                  type="number"
                  InputLabelProps={{
                    shrink: true,

                  }}
                  variant="standard"
                  value={quantity}
                    onChange={handleChangeQuantity}
                    fullWidth
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0}}
                    
                />
              </Box>
            </Grid>
            <Grid item
sm={3}>
              <Box sx={{ mb: 3 }}>
                <FormControl variant="standard"
fullWidth>
                  <InputLabel id="simple-select-unit-label">Đơn vị tính *</InputLabel>
                  <Select
                    labelId="simple-select-unit-label"
                    id="simple-select-unit"
                    value={unitId}
                    onChange={handleChangeUnitId}
                    label="Đơn vị tính *"
                  >
                    {units.map((item) => (
                      <MenuItem key={item.id}
value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container
spacing={2} >
            <Grid item
sm={6}>
              <Box sx={{ mb: 5 }}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Thành phần"
                  variant="standard"
                  value={composition}
                  onChange={handleChangeComposition}
                  multiline={true}
                />
              </Box>
            </Grid>
            <Grid item
sm={6}>
              <Box sx={{ mb: 5 }}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Mô tả"
                  variant="standard"
                  value={description}
                  onChange={handleChangeDescription}
                  multiline={true}
                />
              </Box>
            </Grid>
</Grid>

         

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
      
      <Snackbar  open={showToast}
autoHideDuration={2000}
onClose={handleHideToast} 
        anchorOrigin={{ vertical:"top", horizontal:"right" }}>
        <Alert severity={toast.status}
sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};
