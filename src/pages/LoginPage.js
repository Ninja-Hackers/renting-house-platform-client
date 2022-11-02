import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Alert from "react-bootstrap/Alert";

const signUpBtn = {
  backgroundColor: "#7fdff5",
  borderRadius: "6px",
  color: "white",
  margin: "0rem 0.3rem",
  fontWeight: "bold",
  padding: "0.5rem 1rem",
  border: "none",
};

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();

        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#11222b" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="./signup-img.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-lg-3 text-black">
                    <form onSubmit={handleLoginSubmit}>
                      <div className="d-flex  justify-content-center mb-1 pb-1">
                        <span className="h1 fw-bold mb-0">
                          <img
                            src="./signup-logo.jpg"
                            style={{ width: "80px" }}
                            alt="logo-signup"
                          />
                        </span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-2">
                        <strong>Welcome!</strong>
                      </h5>
                      {errorMessage && (
                        <Alert key="danger" variant="danger">
                          {errorMessage}
                        </Alert>
                      )}

                      <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="formEmail">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleEmail}
                          id="formEmail"
                          className="form-control form-control-lg"
                          placeholder="alice@gmail.com"
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="formPassword">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={handlePassword}
                          id="formPassword"
                          className="form-control form-control-lg"
                          placeholder="password"
                        />
                        <p className="form-text">
                          Password needs to have at least 8 chars and must
                          contain at least one number, one lowercase and one
                          uppercase letter.
                        </p>
                      </div>

                      <div className="pt-1 mb-3">
                        <button style={signUpBtn} type="submit">
                          Login
                        </button>
                      </div>

                      <p className="mb-2 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account yet?
                        <Link to={"/signup"}> Sign Up</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
