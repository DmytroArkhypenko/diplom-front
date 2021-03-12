import React, {useRef, useState} from "react";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState(currentUser.name);
  const [place, setPlace] = useState(currentUser.place);
  const [degree, setDegree] = useState(currentUser.degree);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.userName);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangePlace = (e) => {
    const place = e.target.value;
    setPlace(place);
  };
  const onChangeDegree = (e) => {
    const degree = e.target.value;
    setDegree(degree);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    
    setMessage("");
    setSuccessful(false);
    
    form.current.validateAll();
    
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.updateuser(email, password, place, name, degree, phone, currentUser.username).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          const newUser = {
            ...currentUser,
            email,
            password,
            place,
            name,
            degree,
            phone
          }
          localStorage.setItem("user", JSON.stringify(newUser));
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  
  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
  
  
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
      
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">ПІБ</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    validations={[required]}
                  />
                </div>
            
                <div className="form-group">
                  <label htmlFor="place">Ваше місце роботи/навчання</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="place"
                    value={place}
                    onChange={onChangePlace}
                    validations={[required]}
                  />
                </div>
            
                <div className="form-group">
                  <label htmlFor="degree">Ваша наукова ступінь</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="degree"
                    value={degree}
                    onChange={onChangeDegree}
                    validations={[required]}
                  />
                </div>
            
                <div className="form-group">
                  <label htmlFor="email">Ваш Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>
            
                <div className="form-group">
                  <label htmlFor="phone">Ваш номер телефону</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={phone}
                    onChange={onChangePhone}
                    validations={[required]}
                  />
                </div>
            
                <div className="form-group">
                  <label htmlFor="password">Для зміни введіть новий пароль</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[]}
                  />
                </div>
            
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Оновити</button>
                </div>
              </div>
            )}
        
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
