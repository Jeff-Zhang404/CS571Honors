
import { HashRouter, Routes, Route } from "react-router-dom";

// import pages
import BadgerTransferology from "../BadgerTransferology";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import SavedCoursesPage from "./pages/SavedCoursesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";


export default function BadgerTransRouter() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<BadgerTransferology />}>
        <Route index element={<HomePage />} />
        <Route path="about-us" element={<AboutPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="saved-courses" element={<SavedCoursesPage />} />
        <Route path="log-in" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
}
