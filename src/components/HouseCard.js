import { Link } from "react-router-dom";

function HouseCard({ title, description, _id }) {
  return (
    <div className='card' style={{ width: "30rem" }}>
      <div className='card-body'>
        <Link to={`/houses/${_id}`}>
          <h3>{title}</h3>
        </Link>
        <p style={{ maxWidth: "400px" }}>{description} </p>
      </div>
    </div>
  );
}

export default HouseCard;
