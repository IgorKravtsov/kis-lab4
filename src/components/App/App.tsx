import React from "react";
import "./App.css";

import { SWRConfig } from "swr";

import { Container } from "@mui/material";

import { $api } from "api/config";

import { AppRouter } from "../AppRouter/AppRouter";
import { Header } from "../Header/Header";

function App() {
  return (
    <div className="App">
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            $api(resource, init).then((res) => res.data),
        }}
      >
        <Header />
        <Container>
          <AppRouter />
        </Container>
      </SWRConfig>
    </div>
  );
}

export default App;
