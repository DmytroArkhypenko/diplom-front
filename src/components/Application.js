import React, {useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ApplicationService from "../services/application.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Application = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [position, setPosition] = useState("");
  const [place, setPlace] = useState("");
  const [type, setType] = useState("Сталий розвиток держави: теорія, методологія, механізми забезпечення");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("");
  
  const onChangeName = (e) => {
    const name = e.target.value
    setName(name);
  };
  const onChangeDegree = (e) => {
    const degree = e.target.value
    setDegree(degree);
  };
  const onChangePosition = (e) => {
    const position = e.target.value
    setPosition(position);
  };
  const onChangePlace = (e) => {
    const place = e.target.value
    setPlace(place);
  };
  const onChangeType = (e) => {
    const type = e.target.value
    setType(type);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value
    setPhone(phone);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email);
  };
  const onChangeTheme = (e) => {
    const theme = e.target.value
    setTheme(theme);
  };
  
  const handleApplication = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    
    form.current.validateAll();
    
    if(checkBtn.current.context._errors.length === 0) {
      ApplicationService.sendApplication(name, degree, position, place, type, phone, email, theme).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
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
    <div>
      <Form onSubmit={handleApplication} ref={form}>
        {!successful && (
          <div>
            <div className="form-group">
              <label htmlFor="name">Прізвище, ім'я, по-батькові (повністю) авторів (усіх авторів вписувати в це
                поле)</label>
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
              <label htmlFor="degree">Наукова ступінь (напр. бакалавр)</label>
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
              <label htmlFor="position">Посада</label>
              <Input
                type="text"
                className="form-control"
                name="position"
                value={position}
                onChange={onChangePosition}
                validations={[required]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="place">Місце роботи/навчання (напр. Київський національний університет імені Тарса
                Шевченка) </label>
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
              <label htmlFor="phone">Контактний номер телефону</label>
              <Input
                type="tel"
                className="form-control"
                name="phone"
                value={phone}
                onChange={onChangePhone}
                validations={[required]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="theme">Тема наукової роботи</label>
              <Input
                type="text"
                className="form-control"
                name="theme"
                value={theme}
                onChange={onChangeTheme}
                validations={[required]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Напрями роботи конференції</label>
              <select
                className="form-control"
                name="type"
                value={type}
                onChange={onChangeType}
              >
                <option value="грейпфрут">Реалізація принципів сталого розвитку в забезпеченні економічної та
                  екологічної
                  безпеки держави
                </option>
                <option value="лайм">Енергетика в системі забезпечення сталого розвитку держави</option>
                <option value="кокос">Організаційно-економічні механізми та практична реалізація забезпечення сталого
                  розвитку держави
                </option>
                <option value="манго">Інформаційні технології в системі забезпечення сталого розвитку</option>
              </select>
            </div>
            
            <div className="form-group">
              <button className="btn btn-primary btn-block">
                <span>Подати заявку</span>
              </button>
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
        <CheckButton style={{display: "none"}} ref={checkBtn}/>
      
      
      </Form>
    </div>
  )
};

export default Application;