import React, { FC, useEffect } from "react";
import "./styles/App.css";
import { storageId } from "./constants/constants";
import { useActions } from "./hooks/useAction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinsPage from "./components/CoinsPage";
import CoinItemPage from "./components/CoinItemPage";
import SideNavigation from "./components/SideNav/SideNavigation";
import HomePage from "./components/HomePage";
import RequireAuth from "./components/RequireAuth";
import LogIn from "./components/LogInPage";
import RegPage from "./components/RegPage";
import MErrorBoundary from "./components/ErrorBoundary/MErrorBoundary";

const App: FC = () => {
  const { write } = useActions();
  useEffect(() => {
    const savedCoins = localStorage.getItem(storageId);
    if (savedCoins) {
      write(JSON.parse(savedCoins));
    }
  });
  return (
    <MErrorBoundary>
      <BrowserRouter>
        <SideNavigation />
        <Routes>
          <Route path={"/"} element={<CoinsPage />} />
          <Route
            path={"/coins"}
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />

          <Route path={"/registration"} element={<RegPage />} />
          <Route path={"/login"} element={<LogIn />} />
          <Route path={"/coins/:id"} element={<CoinItemPage />} />
        </Routes>
      </BrowserRouter>
    </MErrorBoundary>
  );
};

export default App;
