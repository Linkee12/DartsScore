// App.tsx
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

const theme = createTheme({
    typography: {
        fontFamily: 'PoetsenOne, Arial, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'PoetsenOne';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: url('/fonts/PoetsenOne.ttf') format('truetype');
                }
            `,
        },
    },
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

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container sx={{ backgroundColor: '#0F1214', flex: "wrap", p: 2, height: '100%', maxWidth: "1500px", minHeight:"100vh"}}>
                <Outlet />
            </Container>
        </ThemeProvider>
    );
}
