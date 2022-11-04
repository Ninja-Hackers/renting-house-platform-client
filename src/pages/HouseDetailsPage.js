import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddReservation from "../components/AddReservation";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./HouseDetailsPage.css";
import AddComments from "../components/AddComments";

const defaultImageUrl =
  "https://res.cloudinary.com/dlualxvyw/image/upload/v1667407221/renting-house-platform/default-5_ljjaxq.png";

function HouseDetailsPage() {
  const [house, setHouse] = useState(null);
  const [addFormCondition, setaddFormCondition] = useState(false);

  const { houseId } = useParams();

  const { user } = useContext(AuthContext);

  const getHouse = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/houses/${houseId}`)
      .then((response) => {
        const oneHouse = response.data;
        setHouse(oneHouse);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getHouse();
  }, []);

  const formOpener = () => {
    if (addFormCondition === false) {
      setaddFormCondition(true);
    } else {
      setaddFormCondition(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#11222b" }}>
      <div className='container-img'>
        <div className='row flex-row justify-content-center mb-4'>
          <div className='col-12 col-md-6 col-lg-4 mb-2'>
            {house && (
              <div className='house-img-card'>
                <div className='card-thumbnail my-3'>
                  <img
                    className='img-responsive'
                    src={house.imageUrl ? house.imageUrl : defaultImageUrl}
                    alt={house.title}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='container-details' >
          <div className='row flex-row justify-content-center'>
            <div className='col-12 col-md-6 col-lg-6 mb-2' >
              {house && (
                <div className='card'>
                  <div className='card-body bg-dark text-white' style={{borderRadius:"1rem", border:"0.2rem solid white"}}>
                    <h3 className='card-title '>{house.title}</h3>
                    <h4 className='card-subtitle mb-2 text-muted'>
                      {house.location}
                    </h4>
                    <p className='card-text'>{house.description}</p>
                    <p className='card-text'>${house.cost}</p>
                    <button className='review-btn' onClick={formOpener}>
                      {house.comments.length} reviews
                    </button>
                    {addFormCondition && (
                      <div className='card text-black'>
                        {addFormCondition &&
                          house.comments.map((comment, index) => (
                            <div key={index}>
                              <p>{comment}</p>
                            </div>
                          ))}
                      </div>
                    )}
                    {house.likes !== 0 && (
                      <p className='card-text'>
                        ♥️ {house.likes} people liked it
                      </p>
                    )}

                    <div className='row justify-content-center'>
                      <div className='row mb-3'>
                        <div className='d-flex justify-content-center flex-row'>
                          {house.guests && (
                            <p className='card-text'>{house.guests} guests </p>
                          )}
                          {house.bedroom &&(
                            <p className='card-text'>
                              • {house.bedroom} bedrooms
                            </p>
                          )}

                          {house.bed && (
                            <p className='card-text'>• {house.bed} beds</p>
                          )}
                          {house.bath && (
                            <p className='card-text'>• {house.bath} bath</p>
                          )}
                        </div>
                      </div>
                      {house.offers.basicOffers.length >= 1 && (
                        <div className='row mb-3 mx-1 text-black'style={{width:"60%"}}>
                          <div className='card align-items-center'>
                            <h5 className='align-items-center'>
                              What this place offers
                            </h5>

                            <>
                              {house.offers.basicOffers.map((offer) => (
                                <div key={offer}>
                                  <li>{offer}</li>
                                </div>
                              ))}
                            </>
                          </div>
                        </div>
                      )}
                      {house && house.reservations.length >= 1 && (
                        <div className='row mb-2 mx-1'>
                          <div className='card align-items-center bg-dark'>
                            <h4 className='align-items-center text-white'>Reservations</h4>
                            {house &&
                              house.reservations.map((reservation) => (
                                <div
                                  className='card mb-2 text-black'
                                  key={reservation._id}
                                >
                                  <div className='row '>
                                    <div className='col-12 col-md-6 col-lg-6 mb-2'>
                                      <p>Check In:</p>
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-6 mb-2'>
                                      <p>
                                        {new Date(
                                          reservation.checkIn
                                        ).toLocaleString("lookup")}
                                      </p>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col'>
                                      <p>Check Out:</p>
                                    </div>
                                    <div className='col'>
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
                      )}
                      
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='col-12 col-md-4 col-lg-4 mb-4'>
              <AddReservation
                refreshHouse={getHouse}
                houseId={houseId}
                {...house}
              />
              <div className='col mt-5'>
              {house && user && house.ownerId !== user._id && (
                <AddComments refreshHouse={getHouse} {...house} />
              )}
            </div>
            </div>
            
          </div>

          <div className='row flex-row'></div>
        </div>
      </div>

      <Link to='/houses'>
        <button className='details-btn'>Back to houses</button>
      </Link>

      {house && user && house.ownerId === user._id ? (
        <Link to={`/houses/edit/${houseId}`}>
          <button className='details-btn'>Edit House</button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HouseDetailsPage;
