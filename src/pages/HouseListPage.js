import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HouseCard from "../components/HouseCard";

const API_URL = "http://localhost:5005";

function HouseListPage() {
  const [houses, setHouses] = useState([]);

  const getAllHouses = () => {
    axios
      .get(`${API_URL}/api/houses`)
      .then((response) => setHouses(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  return (
    <div>
      <h1>List of Houses</h1>
      {houses.map((house) => (
        <HouseCard key={house._id} {...house} />
      ))}
    </div>
  );
}

export default HouseListPage;
