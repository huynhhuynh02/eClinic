import { CacheProvider } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Head from 'next/head';
import Login from './login';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/App.css';
import { theme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { API_END_POINT } from '../utils/constants';
import userService from '../apis/auth.api';

axios.defaults.baseURL = API_END_POINT;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${ token }` : '';
  return config;
})

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [isLogin, setIsLogin] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // check if not exits token
    if (localStorage.getItem('auth_token') !== null && localStorage.getItem('user_name') !== null) {
        userService.getUserProfile().then(
          res => {
            setIsLogin(true);
            setUser(res.data.profile);
            setIsLoading(false);
          }
        ).catch(
          () => {
            setIsLogin(false);
            setIsLoading(false);
          }
        );
    } else {
      setIsLogin(false);
      setIsLoading(false);
    }
    
  },[]);

  if (isLoading)
  {
    return <></>  
  }
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Material Kit Pro
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          { !isLogin ? <Login/> :  getLayout(<Component {...pageProps} />) }
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
