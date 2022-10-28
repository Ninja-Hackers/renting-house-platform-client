import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HouseListPage from "./pages/HouseListPage";
import CreateHousePage from "./pages/CreateHousePage";
import HouseDetailsPage from "./pages/HouseDetailsPage";
import EditHousePage from "./pages/EditHousePage";
import MyReservationPage from "./pages/MyReservationPage";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/houses' element={<HouseListPage />} />
        <Route path='/create-house' element={<CreateHousePage />} />
        <Route path='/houses/:houseId' element={<HouseDetailsPage />} />
        <Route path='/houses/edit/:houseId' element={<EditHousePage />} />
        <Route path='/reservations' element={<MyReservationPage />} />
      </Routes>
    </div>
  );
}

export default App;
