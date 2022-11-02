import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#11222b" }}>
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="./signup-img.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-lg-3 text-black">
                    <form onSubmit={handleSignupSubmit}>
                      <div className="d-flex  justify-content-center mb-1 pb-1">
                        <span className="h1 fw-bold mb-0">
                          <img
                            src="./signup-logo.jpg"
                            style={{ width: "80px" }}
                            alt="logo-signup"
                          />
                        </span>
                      </div>

                      <h5 className="fw-normal mb-1 pb-1">
                        <strong>Create your account</strong>
                      </h5>
                      {errorMessage && (
                        <Alert key="danger" variant="danger">
                          {errorMessage}
                        </Alert>
                      )}

                      <div className="form-outline mb-1">
                        <label className="form-label " htmlFor="formUsername">
                          Username
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={handleName}
                          id="formUsername"
                          className="form-control form-control-lg"
                          placeholder="Alice"
                        />
                      </div>

                      <div className="form-outline mb-1">
                        <label className="form-label" htmlFor="formEmail">
                          Email address
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
                        <p className="form-text mb-1">
                          We'll never share your email with anyone else.
                        </p>
                      </div>

                      <div className="form-outline mb-1">
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

                      <div className="pt-1 mb-2">
                        <button style={signUpBtn} type="submit">
                          Sign Up
                        </button>
                      </div>

                      <p className="mb-3 pb-lg-2" style={{ color: "#393f81" }}>
                        Already have account?
                        <Link to={"/login"}> Login</Link>
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

export default SignupPage;
