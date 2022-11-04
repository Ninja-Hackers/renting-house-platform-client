import { Form, Button, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage({ callbackToSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    callbackToSearch(searchInput);
    navigate("/houses");
  };

  const inputHandler = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <div className="card text-bg-dark mb-3">
        <img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          className="card-img"
          alt="..."
        />
        <div className="card-img-overlay">
          <h5 className="card-title fs-1">Find it, rent it, live there</h5>
          <p className="card-text mb-5 fs-5 fst-italic">
            Let us guide you home
          </p>
          <section className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} style={{width:"50%"}}>
              <FormGroup role="form" className="d-flex col-6 pt-3 w-100 p-3">
                <Form.Control
                  type="search"
                  placeholder="Enter the city"
                  className="me-2"
                  aria-label="Search"
                  value={searchInput}
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
                <Button className="text-white" variant="primary" type="submit">
                  Search
                </Button>
              </FormGroup>
            </form>
          </section>
        </div>
      </div>

      <footer className="bg-light">
        <div className="row mb-3">
          <p className="card-text text-black fst-italic">
            Your perfect place to live, work, or study is just one click away!
            <br />
            Find the houses that gives you all the freedom you need - to get one
            step closer to achieving your goals.
          </p>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          <div className="col text-white mb-2 ">
            <div
              className="card h-100 bg-dark d-felx align-items-center"
              style={{ borderRadius: "2rem" }}
            >
              <img
                src="./verifyList-home.svg"
                className="card-img-top"
                alt="..."
                style={{ width: "20%" }}
              />
              <div className="card-body">
                <h5 className="card-title">Verified Apartments</h5>
                <p className="card-text">
                  We verify listings and visit apartments to make sure you get
                  exactly the home you saw on the pictures.
                </p>
              </div>
            </div>
          </div>
          <div className="col text-white mb-2">
            <div
              className="card h-100 bg-dark d-felx align-items-center"
              style={{ borderRadius: "2rem" }}
            >
              <img
                src="./home-footer-document-icon.svg"
                className="card-img-top"
                alt="..."
                style={{ width: "20%", alignItems: "center" }}
              />
              <div className="card-body">
                <h5 className="card-title">Smart Contracts</h5>
                <p className="card-text">
                  Chose your apartment and rent it by signing the contract
                  online - all of our processes are optimised to save you time.
                </p>
              </div>
            </div>
          </div>
          <div className="col text-white mb-2">
            <div
              className="card h-100 bg-dark d-felx align-items-center"
              style={{ borderRadius: "2rem" }}
            >
              <img
                src="./customer-home-icon.svg"
                className="card-img-top"
                alt="..."
                style={{ width: "20%", alignItems: "center" }}
              />
              <div className="card-body">
                <h5 className="card-title">Personal Support</h5>
                <p className="card-text">
                  We are always here to help you and offer you individual
                  support on every step of the way to your HB Homes. <br />
                  📞 +49 1523334562
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center bg-dark pt-2">
            <p className="text-white">
              Built with love © 2022 by Haridha and Berkay
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
