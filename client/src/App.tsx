import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";

import { FinancialRecordProvider } from "./hooks/dashboard/financial-record-context";
import Hero from "./pages/hero";
import Navbar from "./components/navbar";
import BankConnections from "./pages/bank-connections";
import Footer from "./components/footer";
import {
  AuthenticateWithRedirectCallback,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import CurrenciesPage from "./pages/currencies";
import PricingPage from "./pages/pricing";
import Auth from "./pages/auth";

// Protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <FinancialRecordProvider>
                  <Dashboard />
                </FinancialRecordProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/bank-connections" element={<BankConnections />} />
          <Route path="/currencies" element={<CurrenciesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/sso-callback"
            element={<AuthenticateWithRedirectCallback />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
