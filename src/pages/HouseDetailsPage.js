import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddReservation from "../components/AddReservation";

const API_URL = "http://localhost:5005";

function HouseDetailsPage() {
  const [house, setHouse] = useState(null);
  const { houseId } = useParams();

  const getHouse = () => {
    axios
      .get(`${API_URL}/api/houses/${houseId}`)
      .then((response) => {
        const oneHouse = response.data;
        setHouse(oneHouse);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHouse();
  }, []);

  return (
    <div>
      {house && (
        <>
          <h1>{house.title}</h1>
          <p>{house.description}</p>
        </>
      )}

      {house &&
        house.reservations.map((reservation) => (
          <li className='card' key={reservation._id}>
            <h3>Check In: {reservation.checkIn}</h3>
            <h3>Check Out: {reservation.checkOut}</h3>
            <p>Number of Guests: {reservation.numberOfGuests}</p>
          </li>
        ))}

      <AddReservation refreshHouse={getHouse} houseId={houseId} />

      <Link to='/houses'>
        <button>Back to houses</button>
      </Link>

      <Link to={`/houses/edit/${houseId}`}>
        <button>Edit House</button>
      </Link>
    </div>
  );
}

export default HouseDetailsPage;
