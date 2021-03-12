import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const NewPassword = (props) => {
  const [password,setPasword] = useState("");
  const {token} = useParams();
  
  const onPasswordChange = (e) => {
    const password = e.target.value;
    setPasword(password);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    AuthService.newpassword(password, token);
    props.history.push("/login");
    window.location.reload();
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handlePassword}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onPasswordChange}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block">
              <span>Set new password</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
   )
}


export default NewPassword;