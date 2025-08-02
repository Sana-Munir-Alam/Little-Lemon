import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SpecialMenu from "./components/SpecialMenu";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Menu from "./pages/MenuPage";
import Reservation from "./pages/ReservationPage";
import CheckReservation from './pages/CheckReservation';

function HomePage() {
  return (
    <>
      <Hero />
      <SpecialMenu />
      <Testimonials />
      <AboutUs />
      <Footer />
    </>
  );
}

function ReservationPage(){
  return (
    <>
      <Reservation />
      <Footer />
    </>
  );
}
function MenuPage(){
  return (
    <>
      <Menu />
      <Footer />
    </>
  );
}
function CheckReservationPage(){
  return (
    <>
      <CheckReservation />
      <Footer />
    </>
  );
}
function App() {
  return (
    // This basename="/" was added right after succesful deployment
     <Router basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/check-reservation" element={<CheckReservationPage />} />
      </Routes>
    </Router>
  );
}

export default App;