import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { ThemeProvider } from "./components/theme-provider";
import { FinancialRecordProvider } from "./context/financial-record-context";
import Hero from "./pages/hero";
import Navbar from "./components/navbar";
import BankConnections from "./pages/bank-connections";
import Footer from "./components/footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Footer />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <FinancialRecordProvider>
                  <Dashboard />
                </FinancialRecordProvider>
              }
            />
            <Route path="/bank-connections" element={<BankConnections />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
