import React from 'react';
import './index.css';
import ReactDOM from "react-dom/client";
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './Context/AuthContext';


ReactDOM.createRoot(
  document.getElementById("root"),
)
  .render(
    <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </React.StrictMode>,

  );

reportWebVitals();
