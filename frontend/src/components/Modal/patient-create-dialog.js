import * as React from "react";
import {
  Container,
  Box,
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UseStyles = makeStyles((theme) => ({
  textField: {
    border: 0,
  },
}));

export default function PatientCreateDialog(props) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const Classes = UseStyles();
  const router = useRouter();
  // const [value, setValue] = React.useState(new Date());
  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
  // const [sex, setSex] = React.useState("");
  // const handleChangeSex = (event) => {
  //   setSex(event.target.value);
  // };
  // const [groupPatient, setGroupPatient] = React.useState("");
  // const handleChangeGroupPatient = (event) => {
  //   setGroupPatient(event.target.value);
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
      groupPatient: "",
      birthday: new Date(),
      sex: "",
      phone: "",
      job: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(200, "Must be 200 characters or less").required("Name is required"),
      groupPatient: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Group patient is required"),
      birthday: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Birthday is Required"),
      sex: Yup.string().max(10, "Must be 10 characters or less").required("Sex is Required"),
      phone: Yup.string().max(20, "Must be 20 characters or less").required("Phone is Required"),
      // job: Yup.string().max(10, "Must be 10 characters or less").required("Job is Required"),
      address: Yup.string()
        .max(255, "Must be 255 characters or less")
        .required("Address is Required"),
    }),
    onSubmit: (values) => {
      axios.post("/api/patient-create", values).then(
        (res) => {
          console.log(res.data);
        },
        (error) => {
          console.log(error);
          // setErrorLogin(errors.data.message);
        }
      );
    },
  });
  return (
    <div>
      <Dialog
        open={props.open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Container>
                <Box my={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        label="Họ tên *"
                        variant="outlined"
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="group-patient-select-label">Nhóm bệnh nhân</InputLabel>
                        <Select
                          labelId="group-patient-select-label"
                          id="group-patient-select"
                          name="groupPatient"
                          value={formik.values.groupPatient}
                          onChange={formik.handleChange}
                          label="Nhóm bệnh nhân"
                          // value={groupPatient}
                          // onChange={handleChangeGroupPatient}
                          error={Boolean(formik.touched.groupPatient && formik.errors.groupPatient)}
                          helperText={formik.touched.groupPatient && formik.errors.groupPatient}
                        >
                          <MenuItem value={0}>Nha Khoa</MenuItem>
                          <MenuItem value={1}>Nội Khoa</MenuItem>
                          <MenuItem value={2}>Ngoại Khoa</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                <Box my={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack
                          spacing={3}
                          error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                          helperText={formik.touched.birthday && formik.errors.birthday}
                        >
                          <DesktopDatePicker
                            label="Ngày sinh"
                            inputFormat="MM/dd/yyyy"
                            value={formik.values.birthday}
                            onChange={formik.handleChange}
                            // value={value}
                            // onChange={handleChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                                helperText={formik.touched.birthday && formik.errors.birthday}
                              />
                            )}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="sex-select-label">Giới tính</InputLabel>
                        <Select
                          labelId="sex-select-label"
                          id="sex-select"
                          name="sex"
                          value={formik.values.sex}
                          onChange={formik.handleChange}
                          label="Giới tính"
                          error={Boolean(formik.touched.sex && formik.errors.sex)}
                          helperText={formik.touched.sex && formik.errors.sex}
                          // value={sex}
                          // onChange={handleChangeSex}
                        >
                          <MenuItem value={0}>Nữ</MenuItem>
                          <MenuItem value={1}>Nam</MenuItem>
                          <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                <Box my={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        label="Số điện thoại *"
                        variant="outlined"
                        error={Boolean(formik.touched.phone && formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="job"
                        name="job"
                        value={formik.values.job}
                        onChange={formik.handleChange}
                        label="Nghề nghiệp"
                        variant="outlined"
                        error={Boolean(formik.touched.job && formik.errors.job)}
                        helperText={formik.touched.job && formik.errors.job}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box my={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      label="Địa chỉ"
                      variant="outlined"
                      error={Boolean(formik.touched.address && formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>
                </Box>
              </Container>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              // disabled={formik.isSubmitting}
              // onClick={props.handleClose}
            >
              Lưu lại
            </Button>
            <Button onClick={props.handleClose}>Hủy</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
