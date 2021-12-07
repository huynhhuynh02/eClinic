import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Users as UsersIcon } from "../icons/users";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/patient",
    icon: <UsersIcon fontSize="small" />,
    title: "Khám bệnh",
    submenu: [
      {
        title: "Tạo khám bệnh",
        href: "/schedule",
      },
      {
        title: "Danh sách khám bệnh",
        href: "/patient",
      },
    ],
  },
  {
    href: "/prescribe",
    icon: <AssignmentIcon fontSize="small" />,
    title: "Đơn thuốc",
    submenu: [
      {
        title: "Đơn thuốc",
        href: "/patient",
      },
      {
        title: "Hoá đơn",
        href: "/prescribe",
      },
    ],
  },
  {
    href: "/statistical",
    icon: <BarChartIcon fontSize="small" />,
    title: "Thống kê",
  },
  {
    href: "/settings",
    icon: <SettingsIcon fontSize="small" />,
    title: "Cấu hình",
    submenu: [
      {
        title: "Danh mục",
        href: "/setting-medicine-category-group",
      },
      {
        title: "Thuốc",
        href: "/setting-medicine",
      },
      // {
      //   title: "Từ viết tắt",
      //   href: "/setting-acronym",
      // },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {items.map((item) => (
          <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title}>
            <MenuList
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "background.paper",
                display: "none",
                minWidth: "100%",
              }}
              className="tapa-nav-sub"
            >
              {item.submenu?.map((sub, index) => (
                <MenuItem key={index}>
                  <NextLink href={sub.href} passHref>
                    <Button
                      className="tapa-nav-item"
                      component="a"
                      startIcon={sub.icon}
                      disableRipple
                      sx={{
                        borderRadius: 1,
                        fontWeight: "fontWeightBold",
                        justifyContent: "flex-start",
                        px: 3,
                        textAlign: "left",
                        textTransform: "none",
                        width: "100%",
                        position: "relative",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255, 0.08)",
                        },
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>{sub.title}</Box>
                    </Button>
                  </NextLink>
                </MenuItem>
              ))}
            </MenuList>
          </NavItem>
        ))}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <AppBar
        sx={{
          top: 64,
          backgroundColor: "#fff",
        }}
      >
        <Container>{content}</Container>
      </AppBar>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
