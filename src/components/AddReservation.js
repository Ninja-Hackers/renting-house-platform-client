import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./AddReservation.css";

function AddReservation({ houseId, refreshHouse, ownerId }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { checkIn, checkOut, numberOfGuests, houseId };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/reservations`, requestBody, {
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
    <div className="card pt-3">
      {isLoggedIn ? (
        <>
          <h3>Add New Reservation</h3>
          <form onSubmit={handleSubmit}>
            <div className="col d-flex flex-column justify-content-center col-12 col-md-12 col-lg-12 mb-2 p-4">
              <label>Check In:</label>
              <input
                type="datetime-local"
                name="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />

              <label>Check Out:</label>
              <input
                type="datetime-local"
                name="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />

              <label>Number of Guests</label>
              <input
                type="number"
                name="numberOfGuests"
                value={numberOfGuests}
                min="1"
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
              {ownerId !== user._id ? (
                <button className="reservation-btn" type="submit">
                  Add Reservation
                </button>
              ) : (
                <p className="mt-4">You are the owner of this house</p>
              )}
            </div>
          </form>
        </>
      ) : (
        <h3>Please login to add a reservation</h3>
      )}
    </div>
  );
}

export default AddReservation;
