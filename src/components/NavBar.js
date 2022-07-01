import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import Swal from 'sweetalert2';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUserDetailId } from '../redux/actions/users';

// ----------------------
const NavBar = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [shadow, setShadow] = useState('');

  const [users, setUsers] = useState([]);
  // const userDetailId = useSelector((state) => {
  //   return state.userDetailId;
  // });

  // ------bg-------
  const changeBackground = () => {
    if (window.scrollY > 0) {
      setBackgroundColor('light');
      setShadow('shadow mb-5 bg-body rounded');
    } else {
      setBackgroundColor('');
      setShadow('');
    }
  };

  // ------------
  const token = localStorage.getItem('token');

  // --------Loguot
  const onClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Logout',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/login`);
        Swal.fire('Logout', 'success');
        localStorage.clear();
      }
    });
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener('scroll', changeBackground);

    // ---- user ----
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users-detail-id`, {
        headers: {
          token: token
        }
      })
      .then((response) => {
        // console.log(response.data.data.rows[0].user_name);
        setUsers(response.data.data.rows[0].user_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navbar color={backgroundColor} expand="md" fixed="top" light className={shadow}>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto ms-0 ms-lg-5 mt-2 mb-0 mb-lg-2" navbar>
            <NavItem className={`me-0 me-lg-5`}>
              <Link to="/" className="text-decoration-none" style={{ color: '#2E266F' }}>
                <h6>Home</h6>
              </Link>
            </NavItem>
            <NavItem className="me-0 me-lg-5 ms-0 ms-lg-3">
              <Link to="/addrecipe" className="text-decoration-none" style={{ color: '#2E266F' }}>
                <h6>Add Recipe</h6>
              </Link>
            </NavItem>
            <NavItem className="me-0 me-lg-5 ms-0 ms-lg-3">
              <Link to="/profile" className="text-decoration-none" style={{ color: '#2E266F' }}>
                <h6>Profile</h6>
              </Link>
            </NavItem>
          </Nav>
          <Nav className="me-4 " navbar>
            {!token ? (
              <Link
                to="/Login"
                className="text-decoration-none d-flex"
                style={{ color: '#2E266F', textAlign: 'center' }}>
                <div
                  className="me-0 me-lg-2"
                  style={{
                    backgroundColor: 'white',
                    width: '25px',
                    borderRadius: '10px'
                  }}>
                  <i className="fa-solid fa-user me-0" style={{ color: '#2E266F' }}></i>
                </div>
                <h6>Login</h6>
              </Link>
            ) : (
              <button
                onClick={(e) => onClick(e)}
                type="button"
                className="text-decoration-none d-flex"
                style={{
                  backgroundColor: 'transparent',
                  textAlign: 'center',
                  border: 'none'
                }}>
                <div
                  className="me-0 me-lg-2"
                  style={{
                    backgroundColor: 'white',
                    width: '25px',
                    borderRadius: '10px'
                  }}>
                  <i
                    className="fa-solid fa-right-from-bracket me-0"
                    style={{ color: '#2E266F' }}></i>
                </div>
                <h6>{users}</h6>
              </button>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
