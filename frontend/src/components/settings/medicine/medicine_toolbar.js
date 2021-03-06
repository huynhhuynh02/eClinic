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
import axios from "axios";
import { useState } from "react";

export const SettingMedicineToolbar = ({categories, units, ...props}) => {
  
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
    setExpiredDate(event);
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
    console.log(input)
    axios.post('/api/medicines', input).then(res => {
      if (res.data.status === 'success') {

        setName("");
        setExpiredDate(null);
        setDescription("");
        setCategoryId("");
        setUnitId("");
        setComposition("");

        handleShowToast("Th??m th??nh c??ng!",res.data.status);
      } else {
        handleShowToast("Th??m kh??ng th??nh c??ng",res.data.status);
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
            Th??ng tin thu???c
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              id="standard-basic"
              label="T??n thu???c *"
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
                    label="Ng??y h???t h???n *"
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
                  <InputLabel id="simple-select-category-label">Danh m???c thu???c *</InputLabel>
                  <Select
                    labelId="simple-select-category-label"
                    id="simple-select-category"
                    value={categoryId}
                    onChange={handleChangeCategoryId}
                    label="Danh m???c thu???c*"
                  >
                    {categories?.map((cate) => (
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
                  label="S??? l?????ng"
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
                  <InputLabel id="simple-select-unit-label">????n v??? t??nh *</InputLabel>
                  <Select
                    labelId="simple-select-unit-label"
                    id="simple-select-unit"
                    value={unitId}
                    onChange={handleChangeUnitId}
                    label="????n v??? t??nh *"
                  >
                    {units?.map((item) => (
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
                  label="Th??nh ph???n"
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
                  label="C??ch d??ng"
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
            onClick={handleAddButton}
          >
            Th??m
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
