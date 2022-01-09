import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Container, Button } from '@mui/material';
import NextLink from 'next/link';
import { Logo } from './logo';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { useRouter } from 'next/router';
import axios from 'axios';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.primany,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const router = useRouter();
  const user_name = localStorage.getItem('user_name');
  const logout = (e) => {
    e.preventDefault();

    axios.post('/api/logout').then(res => {
      if (res.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_name');
        router.push('/login');
      }
    },
    errors => {

    })
  }

  return (
    <>
      <DashboardNavbarRoot
        // sx={{
        //   left: {
        //     lg: 280
        //   },
        //   width: {
        //     lg: 'calc(100% - 280px)'
        //   }
        // }}
        {...other}>
        <Container>
          <Toolbar
            disableGutters
            sx={{
              minHeight: 64,
              left: 0,
              px: 2
            }}
          >
            <div>
              <Box>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </Box>
            </div>
            <IconButton
              onClick={onSidebarOpen}
              sx={{
                display: {
                  xs: 'inline-flex',
                  lg: 'none'
                }
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Search">
              <IconButton sx={{ ml: 1, color: '#ffff' }}>
                <SearchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Contacts">
              <IconButton sx={{ ml: 1, color: '#ffff' }}>
                <UsersIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton sx={{ ml: 1, color: '#ffff' }}>
                <Badge
                  badgeContent={4}
                  color="primary"
                  variant="dot"
                >
                  <BellIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Box>{ user_name }</Box>
            <Avatar
              sx={{
                height: 40,
                width: 40,
                ml: 1
              }}
              src="/static/images/avatars/avatar_1.png"
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
            <Button variant="text text-white" onClick={ logout }>Logout</Button>
          </Toolbar>
        </Container>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
