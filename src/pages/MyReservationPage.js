import { useState, useEffect } from "react";
import axios from "axios";
import ReservationDetailsCard from "../components/ReservationDetailsCard";

const API_URL = "http://localhost:5005";

function MyReservationPage() {
  const [reservations, setReservations] = useState([]);

  const getAllReservations = () => {
    axios
      .get(`${API_URL}/api/reservations`)
      .then((response) => setReservations(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <div>
      <h1>List of Houses</h1>
      {reservations.map((reservation) => (
        <ReservationDetailsCard key={reservation._id} {...reservation} />
      ))}
    </div>
  );
}

export default MyReservationPage;
