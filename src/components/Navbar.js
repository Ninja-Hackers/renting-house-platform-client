import { Link } from "react-router-dom";

function Navbar() {
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
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/'>
                Houses
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Create
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                My Reservations
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                My Houses
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Signup
              </Link>
            </li>
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
