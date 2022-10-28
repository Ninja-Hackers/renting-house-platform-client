import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditHousePage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [location, setLocation] = useState("");

  const { houseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/houses/${houseId}`)
      .then((response) => {
        const oneHouse = response.data;
        setTitle(oneHouse.title);
        setDescription(oneHouse.description);
        setCost(oneHouse.cost);
        setLocation(oneHouse.location);
      })
      .catch((error) => console.log(error));
  }, [houseId]);

  const deleteHouse = () => {
    axios
      .delete(`${API_URL}/api/houses/${houseId}`)
      .then(() => {
        navigate("/houses");
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, cost, location };

    axios
      .put(`${API_URL}/api/houses/${houseId}`, requestBody)
      .then((response) => {
        navigate(`/houses/${houseId}`);
      });
  };

  return (
    <div>
      <h3>Edit the House</h3>

      <form onSubmit={handleFormSubmit}>
        <div className='mb-3'>
          <label htmlFor='formTitle' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='formTitle'
            name='title'
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
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            required={true}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type='submit'>Submit</button>
      </form>
      <button onClick={deleteHouse}>Delete House</button>
    </div>
  );
}

export default EditHousePage;
