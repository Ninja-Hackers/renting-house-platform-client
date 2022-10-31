import { Link } from "react-router-dom";

function HouseCard({ title, description, imageUrl, _id }) {
  return (
    <div className='card' style={{ width: "30rem" }}>
      <div className='card-body'>
        <img src={imageUrl} alt={title} />
        <Link to={`/houses/${_id}`}>
          <h3>{title}</h3>
        </Link>
        <p style={{ maxWidth: "400px" }}>{description} </p>
      </div>
    </div>
  );
}

export default HouseCard;
