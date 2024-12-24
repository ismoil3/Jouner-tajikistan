import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0072ff",
        },
        secondary: {
            main: "#f22",
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            light: "#000",
            main: "#ddf",
            dark: "#0072ff",
            contrastText: "#000",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
    },
});

export { lightTheme, darkTheme };