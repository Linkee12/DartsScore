import { Container, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

export default function App() {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#11171D',
                dark: '#111111',
                contrastText: '#c0c0c0',
            },
            secondary: {
                light: '#ff7961',
                main: '#007C7C',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ backgroundColor: '#0F1214', flex: "wrap", p: 2, height: '100vh', maxWidth: "1500px" }}>
                <Outlet />
            </Container>
        </ThemeProvider>
    );
}