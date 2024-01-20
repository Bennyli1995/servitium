import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CategoryPage from "./pages/CategoryPage";
import WorkerDetailsPage from "./pages/WorkerDetailsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header /> {/* This will always be displayed */}
        <main className="flex-grow">
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/category/:categoryLabel" element={<CategoryPage />} />
            <Route path="/worker/:workerId" element={<WorkerDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
