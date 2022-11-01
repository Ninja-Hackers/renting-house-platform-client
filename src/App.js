import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import HouseListPage from "./pages/HouseListPage";
import CreateHousePage from "./pages/CreateHousePage";
import HouseDetailsPage from "./pages/HouseDetailsPage";
import EditHousePage from "./pages/EditHousePage";
import MyReservationPage from "./pages/MyReservationPage";
import MyHousePage from "./pages/MyHousePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/houses' element={<HouseListPage />} />
        <Route
          path='/create-house'
          element={
            <IsPrivate>
              <CreateHousePage />
            </IsPrivate>
          }
        />
        <Route path='/houses/:houseId' element={<HouseDetailsPage />} />
        <Route
          path='/houses/edit/:houseId'
          element={
            <IsPrivate>
              <EditHousePage />
            </IsPrivate>
          }
        />
        <Route
          path='/my-reservations'
          element={
            <IsPrivate>
              <MyReservationPage />
            </IsPrivate>
          }
        />
        <Route
          path='/my-houses'
          element={
            <IsPrivate>
              <MyHousePage />
            </IsPrivate>
          }
        />
        <Route
          path='/signup'
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path='/login'
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
