import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
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
    <>
      <div className="row row-cols-0 row-cols-md-2 row-cols-lg-3 g-4 vh-120" style={{ backgroundColor: "#11222b" }}>
        {houses.length >= 1 ? (
          houses.map((house) => <HouseDetailsCard key={house._id} {...house} />)
        ) : (
          <>
            <Alert key="primary" variant="primary">
              <p className="fs-3 m-2">There are no houses owned by you</p>
            </Alert>
          </>
        )}
      </div>
    </>
  );
}

export default MyHousePage;
