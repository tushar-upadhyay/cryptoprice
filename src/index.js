import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme ,ThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { deepOrange, orange } from '@material-ui/core/colors';
const darkTheme = createMuiTheme({

  palette: {
   
    type: 'dark',
    primary:{
      main:orange[500]
    }
    ,
    secondary:{
      main:deepOrange[900]
    }
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme} >
    <App />
    <CssBaseline/>
    </ThemeProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
