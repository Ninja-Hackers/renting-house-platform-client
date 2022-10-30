import { useState, useEffect } from "react";
import axios from "axios";
import ReservationDetailsCard from "../components/ReservationDetailsCard";

const API_URL = "http://localhost:5005";

function MyReservationPage() {
  const [reservations, setReservations] = useState([]);

  const getAllReservations = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/reservations`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setReservations(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <div>
      <h1>List of My Reservations</h1>
      {reservations.length > 1 ? (
        reservations.map((reservation) => (
          <ReservationDetailsCard key={reservation._id} {...reservation} />
        ))
      ) : (
        <p>There are no reservation</p>
      )}
    </div>
  );
}

export default MyReservationPage;
