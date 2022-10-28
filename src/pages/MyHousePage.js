import { useState, useEffect } from "react";
import axios from "axios";
import HouseDetailsCard from "../components/HouseDetailsCard";

const API_URL = "http://localhost:5005";

function MyHousePage() {
  const [houses, setHouses] = useState([]);
  console.log(houses);

  const getAllHouses = () => {
    axios
      .get(`${API_URL}/api/my-houses`)
      .then((response) => setHouses(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  return (
    <div>
      <h1>List of My Houses</h1>
      {houses.map((house) => (
        <HouseDetailsCard key={house._id} {...house} />
      ))}
    </div>
  );
}

export default MyHousePage;
