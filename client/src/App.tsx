import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { ThemeProvider } from "./components/theme-provider";
import { FinancialRecordProvider } from "./context/financial-record-context";
import HeroPage from "./pages/hero";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route
              path="/dashboard"
              element={
                <FinancialRecordProvider>
                  <Dashboard />
                </FinancialRecordProvider>
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
