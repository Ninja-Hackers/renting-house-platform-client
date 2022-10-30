import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddReservation({ houseId, refreshHouse }) {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { checkIn, checkOut, numberOfGuests, houseId };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/reservations`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCheckIn("");
        setCheckOut("");
        setNumberOfGuests(0);
        refreshHouse();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='AddTask'>
      {isLoggedIn ? (
        <>
          <h3>Add New Reservation</h3>
          <form onSubmit={handleSubmit}>
            <label>Check In:</label>
            <input
              type='datetime-local'
              name='checkIn'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <label>Check Out:</label>
            <input
              type='datetime-local'
              name='checkOut'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            <label>Number of Guests</label>
            <input
              type='number'
              name='numberOfGuests'
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
            <button type='submit'>Add Reservation</button>
          </form>
        </>
      ) : (
        <h3>Please login to add a reservation</h3>
      )}
    </div>
  );
}

export default AddReservation;
