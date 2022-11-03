import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import ReservationDetailsCard from "../components/ReservationDetailsCard";

function MyReservationPage() {
  const [reservations, setReservations] = useState([]);

  const getAllReservations = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/reservations`, {
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
      <div
        className='row row-cols-0 row-cols-md-2 row-cols-lg-2 g-0 vh-120'
        style={{ backgroundColor: "#11222b" }}
      >
        {reservations.length > 1 ? (
          reservations.map((reservation) => (
            <ReservationDetailsCard key={reservation._id} {...reservation} />
          ))
        ) : (
          <>
            <Alert key='primary' variant='primary'>
              <p className='fs-3 m-2'>There are no Reservations</p>
            </Alert>
          </>
        )}
      </div>
    </div>
  );
}

export default MyReservationPage;
