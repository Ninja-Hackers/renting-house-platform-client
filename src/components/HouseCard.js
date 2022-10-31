import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function HouseCard({ title, description, imageUrl, _id }) {
  return (
    <Card className='text-center' style={{ width: "18rem" }}>
      <Card.Img variant='top' src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button as={Link} variant='primary' to={`/houses/${_id}`}>
          Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default HouseCard;
