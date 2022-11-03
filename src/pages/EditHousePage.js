import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import OffersCheckbox from "../components/OffersCheckbox";

const offerList = [
  { value: "wifi", label: "Wifi" },
  { value: "tv", label: "TV" },
  { value: "hair dryer", label: "Hair dryer" },
  { value: "parking", label: "Parking" },
  { value: "air conditioning", label: "Air conditioning" },
  { value: "kitchen", label: "Kitchen" },
];

function EditHousePage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cost, setCost] = useState(0);
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(0);
  const [bedroom, setBedroom] = useState(0);
  const [bed, setBed] = useState(0);
  const [bath, setBath] = useState(0);
  const [offers, setOffers] = useState({ basicOffers: [] });

  const { houseId } = useParams();
  const navigate = useNavigate();

  const submitBtn = {
    backgroundColor: "#7fdff5",
    borderRadius: "6px",
    color: "white",
    margin: "0rem 0.3rem",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    border: "none",
  };
  const deleteBtn = {
    backgroundColor: "#DC5345",
    borderRadius: "6px",
    color: "white",
    margin: "0rem 0.3rem",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    border: "none",
  };
  const defaultImageUrl =
    "https://res.cloudinary.com/dlualxvyw/image/upload/v1667406135/renting-house-platform/default-3_c6nyfo.jpg";

  const onHandleChange = useCallback((value, name) => {
    setOffers((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/houses' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/houses/${houseId}`)
      .then((response) => {
        const oneHouse = response.data;
        setTitle(oneHouse.title);
        setDescription(oneHouse.description);
        if (oneHouse.imageUrl) {
          setImageUrl(oneHouse.imageUrl);
        }
        setCost(oneHouse.cost);
        setLocation(oneHouse.location);
        setGuests(oneHouse.guests);
        setBedroom(oneHouse.bedroom);
        setBed(oneHouse.bed);
        setBath(oneHouse.bath);
        setOffers(oneHouse.offers);
      })
      .catch((error) => console.log(error));
  }, [houseId]);

  const deleteHouse = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/houses/${houseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/houses");
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      description,
      imageUrl,
      cost,
      location,
      guests,
      bedroom,
      bed,
      bath,
      offers,
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/houses/${houseId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        navigate(`/houses/${houseId}`);
      });
  };

  return (
    <div className="vh-120" style={{ backgroundColor: "#11222b" }}>
      <div className="container py-5 h-100 " style={{ width: "50%" }}>
        <div className="card" style={{ borderRadius: "2rem" }}>
          <div
            className="card-header bg-dark text-white fs-4"
            style={{ borderRadius: "2rem 2rem 0rem 0rem" }}
          >
            Edit your House details
          </div>
          <div className="card-body p-lg-3 text-black">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="formTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formTitle"
                  name="title"
                  required={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="formDescription" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formDescription"
                  name="description"
                  required={true}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="formImage" className="form-label">
                  Image
                </label>
                <br />
                <img
                  className="img-responsive mb-3"
                  src={imageUrl ? imageUrl : defaultImageUrl}
                  alt={title}
                  style={{ width: "40%" }}
                />
                <input
                  type="file"
                  className="form-control"
                  id="formImage"
                  name="imageUrl"
                  onChange={(e) => handleFileUpload(e)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="formLocation" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formLocation"
                  name="location"
                  required={true}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-4">
                    <label htmlFor="formGuests" className="form-label">
                      Guests
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="formGuests"
                      name="Guests"
                      required={true}
                      min="0"
                      max="20"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-4">
                    <label htmlFor="formCost" className="form-label">
                      Cost in USD($)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="formCost"
                      name="cost"
                      required={true}
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-4">
                    <label htmlFor="formBedroom" className="form-label">
                      Bedroom
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="formBedroom"
                      name="Bedroom"
                      required={true}
                      min="0"
                      value={bedroom}
                      onChange={(e) => setBedroom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-4">
                    <label htmlFor="formBed" className="form-label">
                      Bed
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="formBed"
                      name="Bed"
                      required={true}
                      min="0"
                      value={bed}
                      onChange={(e) => setBed(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-4">
                    <label htmlFor="formBath" className="form-label">
                      Bath
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="formBath"
                      name="Bath"
                      required={true}
                      min="0"
                      value={bath}
                      onChange={(e) => setBath(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-4">
                  <OffersCheckbox
                    name="basicOffers"
                    title="Offers"
                    value={offers.basicOffers}
                    options={offerList}
                    onChangeFunc={onHandleChange}
                  />
                </div>
              </div>

              <button style={submitBtn} type="submit">
                Submit
              </button>
              <button style={deleteBtn} onClick={deleteHouse}>
                Delete House
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditHousePage;
