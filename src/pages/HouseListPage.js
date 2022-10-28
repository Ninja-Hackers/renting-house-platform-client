import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className='ProjectListPage'>
      <h1>List of Houses</h1>
      {houses.map((house) => {
        return (
          <div className='card' key={house._id}>
            <Link to={`/projects/${house._id}`}>
              <h3>{house.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default HouseListPage;
