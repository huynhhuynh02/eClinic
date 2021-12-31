import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ListRole } from '../../components/role/list-role';
import { ToolBar } from '../../components/tool-bar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useState } from 'react';

const headings = [
    {
        name: "#",
        description: "Thứ tự"
    },
    {
        name: "Name",
        description: "Tên quyền"
    },
    {
        name: "Permissions",
        description: "Quyền hạng"
    },
    {
        name: "Created at",
        description: "Ngày tạo"
    },
    {
        name: "Edit",
        description: "Chỉnh sửa"
    },
    {
        name: "Delete",
        description: "Xóa"
    },
];

const roles = [
    {
        name: "Bác sĩ",
        permissions: [
            {
                name: "Thêm bệnh nhân"
            },
            {
                name: "Sửa bệnh nhân"
            },
            {
                name: "Xóa bệnh nhân"
            },
            {
                name: "Kê đơn thuốc"
            },
            {
                name: "Xóa đơn thuốc"
            },
            {
                name: "Sửa đơn thuốc"
            },
        ]
    },
    {
        name: "Y tá",
        permissions: [
            {
                name: "Thêm bệnh nhân"
            },
            {
                name: "Sửa bệnh nhân"
            },
            {
                name: "Xóa bệnh nhân"
            }
        ]
    },
];

const Roles = () => {
    return (
        <>
            <Head>
            <title>
                Phân quyền | TAPA App
            </title>
            </Head>
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
            >
            <Container maxWidth={false}>
                <ToolBar title="Vai trò - Phân quyền" isNewButton={ true } textButtonAdd="Thêm vai trò"/>
                <Box sx={{ mt: 3 }}>
                <ListRole headings={ headings } roles={ roles }/>
                </Box>
            </Container>
            </Box>
        </>
    )
}
Roles.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Roles;
