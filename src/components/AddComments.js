import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./AddReservation.css";
import { useParams } from "react-router-dom";

function AddComments({ refreshHouse, likes }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { houseId } = useParams();

  const [comment, setComment] = useState("");
  const [likeCondition, setLikeCondition] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(likes);

  const addLike = () => {
    if (likeCondition === false) {
      setLikeCondition(true);
      setNumberOfLikes((prevValue) => prevValue + 1);
    } else {
      setLikeCondition(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { comment, numberOfLikes, houseId };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/houses/${houseId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setComment("");
        refreshHouse();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='card'>
      {isLoggedIn ? (
        <>
          <h4>Add a Comment</h4>
          <form onSubmit={handleSubmit}>
            <div className='col d-flex flex-column justify-content-center col-12 col-md-12 col-lg-12 p-4'>
              <label>What do you think about it?</label>
              <input
                type='text'
                name='comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <label>Did you like it?</label>
              <input type='checkbox' name='like' onClick={addLike} />
            </div>
            <button className='reservation-btn' type='submit'>
              Submit
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddComments;
