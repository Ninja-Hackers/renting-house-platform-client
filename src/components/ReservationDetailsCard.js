import { Link } from "react-router-dom";

function ReservationDetailsCard({ checkIn, checkOut, numberOfGuests}) {
  return (
    <div className="card m-5" style={{ width: "20rem" , borderRadius: "2.5rem ", border: ".32rem solid black"}}>
    <div
            className="card-header bg-dark text-white fs-3"
            style={{ borderRadius: "1.9rem 2rem 0rem 0rem" }}
          >
            House Title
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 mb-2">
            <p>Check In:</p>
          </div>
          <div className="col-12 col-md-6 col-lg-6 mb-2">
            <p>{new Date(checkIn).toLocaleString("lookup")}</p>
          </div>
        </div>
        <div className="row">
        <div className="col-12 col-md-6 col-lg-6 mb-2">
            <p>Check Out:</p>
          </div>
          <div className="col-12 col-md-6 col-lg-6 mb-2">
            <p>{new Date(checkOut).toLocaleString("lookup")}</p>
          </div>
        </div>
        <div className="row">
        <div className="col-12 col-md-6 col-lg-6 mb-2">
            <p>Number of Guests:</p>
          </div>
          <div className="col-12 col-md-6 col-lg-6 mb-2">
          <p>{numberOfGuests}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ReservationDetailsCard;
