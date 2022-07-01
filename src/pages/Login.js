import React, { useState } from 'react';
// import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styleregister from '../assets/styles/Login.module.css';
import imagelogin from '../assets/images/iconlogin.svg';
import imgLogin from '../assets/images/login.png';
import Swal from 'sweetalert2';
import { postUserLogin } from '../redux/actions/users';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (form.email == '' || form.password == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All data must be filled'
      });
    } else {
      const body = {
        email: form.email,
        password: form.password
      };
      postUserLogin(body)
        .then((response) => {
          if (response.data.code == '500') {
            alert(response.data.message);
          } else {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            return navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Ooops... Login Failed',
            text: 'Check your email and password'
          });
        });
    }
  };

  const myStyle = {
    backgroundImage: `url(${imgLogin})`
  };
  return (
    <>
      <div className={styleregister.container}>
        <div style={myStyle} className={styleregister.containerLeft}>
          <img src={imagelogin} alt="icon" style={{ zIndex: '999' }} />
        </div>
        <div className={styleregister.containerRegister}>
          <div className={styleregister.registerMain}>
            <h3 className={styleregister.registerMainH3}>Welcome</h3>
            <p className={styleregister.registerMainP}>Log in into your exiting account</p>
            <form onSubmit={(e) => onSubmit(e)}>
              <label className={styleregister.registerMainEmail}>E-mail</label>
              <input
                className={styleregister.mainEmailInput}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder=" examplexxx@gmail.com"
                id="email"
              />
              <label className={styleregister.mainCreatePassword}>Password</label>
              <input
                className={styleregister.createPasswordInput}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                placeholder=" Password"
                id="create-password"
              />
              <br />
              <label className={styleregister.agreeFormLabel}>
                <input type="checkbox" id="agree" /> I agree to terms & conditions
              </label>
              <button type="submit" className={styleregister.mainButtonButton}>
                {/* <Link className={styleregister.buttonButtonA} to="#"> */}
                Log in
                {/* </Link> */}
              </button>
            </form>
            <br />
            <a className={styleregister.mainForgotA} href="#">
              Forgot Password ?
            </a>
            <br />
            {/* </div> */}
            {/* <div class="signup"> */}
            <Link to="/register" className={styleregister.mainSignupA}>
              Dont have an account? <span className={styleregister.mainLoginASpan}>Sign Up</span>
            </Link>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
