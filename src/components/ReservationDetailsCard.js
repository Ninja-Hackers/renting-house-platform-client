import { Link } from "react-router-dom";

function ReservationDetailsCard({ checkIn, checkOut, numberOfGuests }) {
  return (
    <div className='card' style={{ width: "30rem" }}>
      <div className='card-body'>
        <h3>{checkIn}</h3>
        <h3>{checkOut}</h3>
        <p>{numberOfGuests}</p>
      </div>
    </div>
  );
}

export default ReservationDetailsCard;
