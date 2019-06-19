import React from 'react';
import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        // type: 'light',
    },
    typography: {
        useNextVariants: true,
    },
});

const App = props => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        {props.children}
    </MuiThemeProvider>
);

export default App;
