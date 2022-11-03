import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
const defaultImageUrl =
  "https://res.cloudinary.com/dlualxvyw/image/upload/v1667406135/renting-house-platform/default-3_c6nyfo.jpg";

const submitBtn = {
  backgroundColor: "#7fdff5",
  borderRadius: "6px",
  color: "white",
  margin: "0rem 0.5rem",
  fontWeight: "bold",
  padding: "0.5rem 1rem",
  border: "none",
};

function HouseDetailsCard({
  title,
  description,
  imageUrl,
  cost,
  location,
  offers,
  reservations,
  _id,
}) {
  const [addReservationCondition, setAddReservationCondition] = useState(false);
  const buttonTitle = addReservationCondition
    ? "Hide Reservation"
    : "Show Reservations";
  const reservationDetailsOpener = () => {
    if (addReservationCondition === false) {
      setAddReservationCondition(true);
    } else {
      setAddReservationCondition(false);
    }
  };

  const [addOffersCondition, setOffersCondition] = useState(false);
  const offersTitle = addOffersCondition ? "Hide Offers" : "Show Offers";
  const offersOpener = () => {
    if (addOffersCondition === false) {
      setOffersCondition(true);
    } else {
      setOffersCondition(false);
    }
  };
  return (
    <div className="col py-3">
      <div className="card h-100 mx-4" style={{ border: "0.2rem solid white" }}>
        <img
          className="img-responsive"
          src={imageUrl ? imageUrl : defaultImageUrl}
          alt={title}
        />
        <div className="card-body bg-dark">
          <div className="row row-cols-1 g-2">
            <div className="col text-white">
              <div className="card-body">
                <h5 className="card-title fs-3">
                  {title},{location}
                </h5>
                <p className="card-text">{description}</p>
                <p className="card-text fs-5"> Price: ${cost}</p>
                {addOffersCondition && (
                  <div className="row mb-1">
                    {offers.basicOffers.length >= 1 ? (
                      <>
                        <p className="card-text">Offers</p>
                        <li
                          className="card text-black"
                          style={{ width: "150%", borderRadius: "1rem" }}
                        >
                          {offers.basicOffers.map((offer) => (
                            <div key={offer}>
                              <p>{offer}</p>
                            </div>
                          ))}
                        </li>
                      </>
                    ) : (
                      <Alert key="success" variant="success">
                        <p className="fs-3 m-2">
                          There are no offers added to this house
                        </p>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            </div>
            {addReservationCondition && (
              <div className="col" style={{ borderRadius: "2rem" }}>
                <div className="card-body">
                  {reservations.length >= 1 ? (
                    <div className="row">
                      <div className="card align-items-center pt-2">
                        <div
                          className="card-header bg-black text-white fs-5"
                          style={{ borderRadius: "2rem 2rem 0rem 0rem" }}
                        >
                          House Reservation Details
                        </div>
                        {reservations.map((reservation) => (
                          <div className="card mb-2 px-1" key={reservation._id}>
                            <div className="row">
                              <div className="col-12 col-md-6 col-lg-6 mb-2">
                                <p>Check In:</p>
                              </div>
                              <div className="col-12 col-md-6 col-lg-6 mb-2">
                                <p>
                                  {new Date(reservation.checkIn).toLocaleString(
                                    "lookup"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 col-md-6 col-lg-6 mb-2">
                                <p>Check Out:</p>
                              </div>
                              <div className="col-12 col-md-6 col-lg-6 mb-2">
                                <p>
                                  {new Date(
                                    reservation.checkOut
                                  ).toLocaleString("lookup")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Alert key="primary" variant="primary">
                      <p className="fs-3 m-2">
                        There are no Reservations to this house
                      </p>
                    </Alert>
                  )}
                </div>
              </div>
            )}
            <div className="col mb-2">
              <button onClick={offersOpener} style={submitBtn}>
                {offersTitle}
              </button>
              <button onClick={reservationDetailsOpener} style={submitBtn}>
                {buttonTitle}
              </button>
            </div>
            <Link to={`/houses/edit/${_id}`}>
              <button className="btn btn-primary">Edit House</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetailsCard;
