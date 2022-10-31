import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddReservation from "../components/AddReservation";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function HouseDetailsPage() {
  const [house, setHouse] = useState(null);
  const { houseId } = useParams();

  const { user } = useContext(AuthContext);

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
          <img src={house.imageUrl} alt={house.title} />
          <h1>{house.title}</h1>
          <p>{house.description}</p>
          {house.offers.basicOffers.length >= 1 && (
            <li className='card'>
              {house.offers.basicOffers.map((offer) => (
                <div key={offer}>
                  <p>{offer}</p>
                </div>
              ))}
            </li>
          )}
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

      {house && user && house.ownerId === user._id ? (
        <Link to={`/houses/edit/${houseId}`}>
          <button>Edit House</button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HouseDetailsPage;
