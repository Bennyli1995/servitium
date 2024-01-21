import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CategoryPage from "./pages/CategoryPage";
import WorkerDetailsPage from "./pages/WorkerDetailsPage";
import LoginPage from "./pages/LoginPage";
import SearchResultsPage from "./pages/SearchResultsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <div className="flex flex-col h-screen">
          <Header /> {/* This will always be displayed */}
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route
                path="/category/:categoryLabel"
                element={<CategoryPage />}
              />
              <Route path="/worker/:workerId" element={<WorkerDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
};

export default App;
