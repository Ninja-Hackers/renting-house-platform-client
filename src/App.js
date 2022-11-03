import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
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
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [houses, setHouses] = useState([]);
  const [filteredhouses, setFilteredHouses] = useState([]);

  console.log("Houses", houses);
  console.log("Filtered Houses", filteredhouses);

  //Get All Houses
  const getAllHouses = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/houses`)
      .then((response) => setHouses(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  //Search House Function
  const searchHouse = (searchItem) => {
    console.log("searchItem", searchItem);
    const newList = houses.filter((house) => {
      if (searchItem === "") {
        return house;
      } else {
        return house.location.toLowerCase().includes(searchItem.toLowerCase());
      }
    });
    setFilteredHouses(newList);
  };
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage callbackToSearch={searchHouse} />} />
        <Route
          path='/houses'
          element={<HouseListPage filteredhouses={filteredhouses} />}
        />
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
