import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { API_END_POINT } from '../utils/constants';

const Login = () => {
  const [errorLogin, setErrorLogin] = useState(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: (values) => {
      axios.get(`${API_END_POINT}/sanctum/csrf-cookie`).then(response => {
        axios.post(`${API_END_POINT}/api/login`, values).then(res => {
          if (res.data.status === true) {
            localStorage.setItem('auth_token', res.data.access_token);
            localStorage.setItem('user_name', res.data.user.name);
            router.push('/');
          } else {
            setErrorLogin(res.data.message);
          }
        })
      });
    }
  });

  return (
    <>
      <Head>
        <title>Login | EClinic</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                Đăng nhập bằng email
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mật khẩu"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            {errorLogin != null && <Box sx={{ textAlign: 'left', color: '#e91e63' }}>{ errorLogin }</Box> }
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
