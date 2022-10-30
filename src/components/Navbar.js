import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Home
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          {/* we are inside of ul regardles of login/logout/register */}
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/houses'>
                Houses
              </Link>
            </li>

            {isLoggedIn && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/create-house'>
                    Create
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/my-reservations'>
                    My Reservations
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/my-houses'>
                    My Houses
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link onClick={logOutUser} className='nav-link' to='/'>
                    Logout
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='btn btn-outline-success my-2 my-sm-0' to='/'>
                    {user && user.name}
                  </Link>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/signup'>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav>
//       <Link to='/'>
//         <button>Home</button>
//       </Link>

//       <Link to='/houses'>
//         <button>Houses</button>
//       </Link>
//     </nav>
//   );
// }

// export default Navbar;
