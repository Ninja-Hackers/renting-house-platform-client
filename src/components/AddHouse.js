import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddHouse(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cost, setCost] = useState(0);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/houses' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, imageUrl, cost, location };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/houses`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/my-houses");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add a House</h3>

      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='formTitle' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='formTitle'
            name='title'
            placeholder='Enter a title'
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='formDescription' className='form-label'>
            Description
          </label>
          <textarea
            type='text'
            className='form-control'
            id='formDescription'
            name='description'
            placeholder='Enter a description'
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='formImage' className='form-label'>
            Image
          </label>
          <input
            type='file'
            className='form-control'
            id='formImage'
            name='imageUrl'
            onChange={(e) => handleFileUpload(e)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='formCost' className='form-label'>
            Cost
          </label>
          <input
            type='number'
            className='form-control'
            id='formCost'
            name='cost'
            placeholder='Enter a cost'
            required={true}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='formLocation' className='form-label'>
            Location
          </label>
          <input
            type='text'
            className='form-control'
            id='formLocation'
            name='location'
            placeholder='Enter a location'
            required={true}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AddHouse;
