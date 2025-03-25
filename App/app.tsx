import {  Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

export default function App() {
    

    return (
        <Container sx={{ backgroundColor: '#0F1214', flex: "wrap", p: 6, height: '100vh',maxWidth:"1500px" }}>
            <Outlet />
        </Container>
    );
}