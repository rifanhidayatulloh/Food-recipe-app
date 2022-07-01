import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styleregister from '../assets/styles/Register.module.css';
import imagelogin from '../assets/images/iconlogin.svg';
import { postUserRegister } from '../redux/actions/users';
import Swal from 'sweetalert2';
import imgLogin from '../assets/images/login.png';

const Register = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    newPassword: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      form.name == '' ||
      form.email == '' ||
      form.phone == '' ||
      form.password == '' ||
      form.newPassword == '' ||
      !photo
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All data must be filled'
      });
    } else {
      if (form.password !== form.newPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "The password entered doesn't match"
        });
      } else {
        const data = new FormData();
        data.append('userName', form.name);
        data.append('email', form.email);
        data.append('phone', form.phone);
        data.append('password', form.password);
        data.append('image', photo);
        // console.log(data);
        // console.log(photo);
        // for (var key of data) {
        //   console.log(key);
        // }

        postUserRegister(data)
          .then(() => {
            Swal.fire('Registered', 'Successful Registration', 'success');
            return navigate('/login');
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
            <h3 className={styleregister.registerMainH3}>Lets Get Started !</h3>
            <p className={styleregister.registerMainP}>Create new account to access all features</p>
            <form onSubmit={(e) => onSubmit(e)}>
              <label className={styleregister.registerMainName}>Name</label>
              <input
                className={styleregister.mainNameInput}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                placeholder=" Name"
                id="name"
              />
              <label className={styleregister.registerMainEmail}>Email address</label>
              <input
                className={styleregister.mainEmailInput}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder=" Enter email address"
                id="email"
              />
              <label className={styleregister.registerMainPhone}>Phone Number</label>
              <input
                className={styleregister.mainPhoneInput}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                type="number"
                placeholder=" 08xxxxxxxxxx"
                id="phone"
              />
              <label className={styleregister.mainCreatePassword}>Create New Password</label>
              <input
                className={styleregister.createPasswordInput}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                placeholder=" Create New Password"
                id="create-password"
              />
              <label className={styleregister.mainNewPassword}>New Password</label>
              <input
                className={styleregister.newPasswordInput}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                type="password"
                placeholder=" New Password"
                id="new-password"
              />
              <br />
              <input
                onChange={(e) => setPhoto(e.target.files[0])}
                type="file"
                className={styleregister.inputFileImage}
                accept=".jpg, .png"
              />
              <label className={styleregister.agreeFormLabel}>
                <input type="checkbox" id="agree" /> I agree to terms & conditions
              </label>
              <button type="submit" className={styleregister.mainButtonButton}>
                {/* <Link className={styleregister.buttonButtonA} to="#"> */}
                Register Account
                {/* </Link> */}
              </button>
            </form>
            <div className={styleregister.spaceDiv}></div>
            <Link to="/login" className={styleregister.mainLoginA}>
              Already have account?{' '}
              <span className={styleregister.mainLoginASpan}>Log in Here</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
