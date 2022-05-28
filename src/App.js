import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Profile from "./pages/Profile";

import "./App.css";
import AppAppBar from "./pages/modules/views/AppAppBar";
import AppFooter from "./pages/modules/views/AppFooter";
import { auth } from "./services/firebaseService";
import ReadBook from "./pages/ReadBook";
import History from "./pages/History";
import ReadLater from "./pages/ReadLater";
import BookMovie from "./pages/BookMovie";

function App() {
  const [isAuth, setIsAuth] = React.useState(auth.currentUser !== null);
  console.log(auth.currentUser);
  return (
    <>
      <AppAppBar setIsAuth={setIsAuth} isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/read-later" element={<ReadLater />} />
        <Route path="/read-book/:id" element={<ReadBook />} />
        <Route path="/book-movie-recommendation" element={<BookMovie />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <AppFooter description="Made with ❤️ by Aayushi" title="Book Geek" />
    </>
  );
}

export default App;
