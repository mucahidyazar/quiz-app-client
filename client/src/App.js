import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import { store } from "./redux";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
