import { Link } from "react-router-dom";

function HouseDetailsCard({
  title,
  description,
  imageUrl,
  cost,
  location,
  reservations,
  _id,
}) {
  return (
    <div className='card' style={{ width: "30rem" }}>
      <div className='card-body'>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{cost}</p>
        <p>{location}</p>
        {reservations.map((reservation) => (
          <li className='card' key={reservation._id}>
            <p>Check In: {reservation.checkIn}</p>
            <p>Check Out: {reservation.checkOut}</p>
            <p>Number of Guests: {reservation.numberOfGuests}</p>
          </li>
        ))}
        <Link to={`/houses/edit/${_id}`}>
          <button>Edit House</button>
        </Link>
      </div>
    </div>
  );
}

export default HouseDetailsCard;
