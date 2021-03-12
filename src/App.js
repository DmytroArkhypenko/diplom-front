import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import BoardAdmin from "./components/BoardAdmin";
import ResetPassword from "./components/ResetPassword";
import NewPassword from "./components/NewPassword";
import Application from "./components/Application";
import Archives from "./components/Archives";
import Gallery from "./components/Gallery";
import Presentations from "./components/Presentations";


const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  let name;
  let room;


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      name = user.name;
      room = 'common';
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  
  
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Конфа
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Головна
            </Link>
          </li>
  
          <li className="nav-item">
            <Link to={"/application"} className="nav-link">
              Заявка на участь
            </Link>
          </li>
  
          <li className="nav-item">
            <Link to={"/gallery"} className="nav-link">
              Галерея
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/presentations"} className="nav-link">
              Архів презентацій
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/archives"} className="nav-link">
              Архів робіт
            </Link>
          </li>
          
          {currentUser && (
            <li className="nav-item">
              <Link to={`/chat?name=${name}&room=${room}`} className="nav-link">
                Користувацький чат
              </Link>
            </li>
          )}
  
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Сторінка адміністратора
              </Link>
            </li>
          )}
        </div>
  


        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Вийти
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Логін
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Реєстрація
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/application" component={Application} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/passwordreset" component={ResetPassword} />
          <Route path="/reset/:token" component={NewPassword} />
          <Route path="/chat" component={Chat} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/presentations" component={Presentations} />
          <Route path="/archives" component={Archives} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
