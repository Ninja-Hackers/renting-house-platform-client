import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../pages/HouseListPage.css";

const defaultImageUrl =
  "https://res.cloudinary.com/dlualxvyw/image/upload/v1667329119/renting-house-platform/default_hfyfkl.jpg";

function HouseCard({ title, description, imageUrl, cost, location, _id }) {
  return (
    <>
      <div className='col-12 col-md-6 col-lg-4 mb-2'>
        <div className='product-card'>
          <div className='card-thumbnail'>
            <img
              className='img-responsive'
              src={imageUrl ? imageUrl : defaultImageUrl}
              alt={title}
            />
          </div>
          <div className='card-content'>
            <h1 className='card-title'>{title}</h1>
            <p className='description'>{description}</p>
            <ul className='list-inline post-meta'>
              <li className='location'>
                <i className='fa fa-clock-o'></i> {location}
              </li>
            </ul>
            <p className='card-sub-title'>Price ${cost}</p>

            <Button
              className='button'
              as={Link}
              to={`/houses/${_id}`}
              variant='primary'
              size='sm'
            >
              More Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HouseCard;
