import { useState, useEffect } from "react";
import axios from "axios";
import HouseDetailsCard from "../components/HouseDetailsCard";

function MyHousePage() {
  const [houses, setHouses] = useState([]);

  const getAllHouses = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/my-houses`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setHouses(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  return (
    <div>
      <h1>List of My Houses</h1>
      {houses.length >= 1 ? (
        houses.map((house) => <HouseDetailsCard key={house._id} {...house} />)
      ) : (
        <p>There are no houses</p>
      )}
    </div>
  );
}

export default MyHousePage;
