import { useState, useEffect } from "react";
import axios from "axios";
import HouseCard from "../components/HouseCard";
import "./HouseListPage.css";

function HouseListPage() {
  const [houses, setHouses] = useState([]);

  const getAllHouses = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/houses`)
      .then((response) => setHouses(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  return (
    <div>
      <div className='product-container'>
        <div className='container'>
          <div className='row flex-row'>
            {houses.map((house) => (
              <HouseCard key={house._id} {...house} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseListPage;
