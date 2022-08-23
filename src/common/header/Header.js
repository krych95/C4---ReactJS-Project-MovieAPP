import React, {useState} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'
import { useHistory } from "react-router-dom";

 
export default function Header(props) {

  const history = useHistory();

  const [modalstate, setmodalstate] = useState(false);
  const [isLoggedIn,setisLoggedIn] = useState(false);
  const [tabstate, settabstate] = useState(0);

  const tabhandeler = (event, newvalue) => {
        settabstate(newvalue);
      }
  const modalHandaler = () =>{
    setmodalstate(true);
  }

  const [userLogindetails, setuserLogindetails] = useState({username:'', password:''});
  const [userRegDetails, setuserRegDetails] = useState({firstname:'', lastname:'',  email:'',  password:'', contactnumbers:'' });
  const [regSucess, setregSucess] = useState("");

  const loginFormHandler = (e) =>{
      const setvalue = userLogindetails;
      setvalue[e.target.name] = e.target.value;
      setuserLogindetails({...setvalue})
  } 
  
  //login functions 
  const  onLoginFormSubmit = async (e) => {
  const authcode = window.btoa(`${userLogindetails.username}:${userLogindetails.password}`);
     try {
          const loginresponse = await fetch(props.baseUrl+ 'auth/login', {
              method: 'POST',
              headers: {
                  "Accept": "application/json;charset=UTF-8",
                  "Cache-Control": "no-cache",
                  authorization: `Basic ${authcode}`
              },
              });
              
              const  loginresponseResult = await loginresponse.json();

               if(loginresponse.ok) {
                  window.sessionStorage.setItem( 'access-token', loginresponse.headers.get('access-token'));
                  setisLoggedIn(true)
                  setmodalstate(false)
              } else {
                  const error = new Error();
                  error.message = loginresponseResult.message || 'Something went wrong.';
              }
          }
      catch(e) {
              alert(`Error: ${e.message}`);
           }
    };
     
    //logout functions
    const logouthandaler = async (e) =>{
      const userauthcode = sessionStorage.getItem("access-token");
         try {
              const logoutresponse = await fetch(props.baseUrl+ 'auth/logout', {
                  method: 'POST',
                  headers: {
                      "Accept": "application/json;charset=UTF-8",
                      "Cache-Control": "no-cache",
                      Authorization: `Bearer ${userauthcode}`
                  },
                  });
         
                  if(logoutresponse.status === 200){
                    setisLoggedIn(false)
                  }else {
                      const error = new Error();
                      error.message =  'Something went wrong.';
                  }
              }
          catch(e) {
                  alert(`Error: ${e.message}`);
               }
        };
    // Registration Function

    const regFormHandler = (e) =>{
      const setregvalue = userRegDetails;
      setregvalue[e.target.name] = e.target.value;
      setuserRegDetails({...setregvalue})
  } 

    
    const  onRegFormSubmit = async (e) => {
      const params = {
        email_address: userRegDetails.email,
        first_name: userRegDetails.firstname,
        last_name: userRegDetails.lastname,
        mobile_number: userRegDetails.contactnumbers,
        password: userRegDetails.password
      }
         try {
              const signupresponse = await fetch(props.baseUrl+ 'signup', {
                  method: 'POST',
                  headers: {
                      "Accept": "application/json;charset=UTF-8",
                      "Content-Type": "application/json;charset=UTF-8",
                      "Cache-Control": "no-cache",
                  },
                  body: JSON.stringify(params),
                  });
                  
                  const  signupresponseResult = await signupresponse.json();
    
                   if(signupresponse.ok) {
                    setregSucess("Registration Successful.Please Login!")
            
                  } else {
                      const error = new Error();
                      error.message = signupresponseResult.message || 'Something went wrong.';
                  }
              }
          catch(e) {
                  alert(`Error: ${e.message}`);
               }
        };
    const renderbookshow = () => {
      history.push(`/bookshow/${props.movieid}`)
    }



  return (
    <div>
        <div className='movieAppheader'>
            <div className="applogo">
                <img className='applogoImg' src={logo} alt="applogo" />
            </div>
            <div className="headers_buttons"> 
               {
               isLoggedIn ? (
               <div>
                { props.buutonSingle ? (
                <div>          
               <Button variant="contained" color="default" className='loginlogoutbtn'  onClick={logouthandaler}>LOGOUT</Button>
               </div>) : (  
                  <div>          
               <Button variant="contained" color="primary" name="BOOK SHOW" className='bookshow' onClick={renderbookshow}>Book Show</Button>
               <Button variant="contained" color="default" className='loginlogoutbtn'  onClick={logouthandaler}>LOGOUT</Button>
               </div>
               )}
   
               </div>
               ) : (
                <div>
                   { props.buutonSingle ? (  
                    <div>          
             <Button variant="contained" color="default" className='loginlogoutbtn'  onClick={modalHandaler}>LOGIN</Button>
              </div>
               ) :(  
                <div>    
              <Button variant="contained" color="primary" name="BOOK SHOW" className='bookshow' onClick={modalHandaler}>Book Show</Button>
              <Button variant="contained" color="default" className='loginlogoutbtn'  onClick={modalHandaler}>LOGIN</Button>
              </div>
              )} 
              </div>
              ) 
              }
          </div>
        </div>

        <Dialog open={modalstate} aria-labelledby="form-dialog-title">
          <DialogContent>
              <Tabs value={tabstate} onChange={tabhandeler} centered>
                  <Tab label="LOGIN"   />
                  <Tab label="REGISTER"  />
              </Tabs>
          {tabstate === 0 && 

          //Logoin Form 
          <div>
 
        <ValidatorForm className="logoin-form" onSubmit={onLoginFormSubmit}>
           <TextValidator
              id="username"
              label="Username*"
              type="text"
              name="username"
              onChange={loginFormHandler}
              value={userLogindetails.username}
              validators={['required']}
              errorMessages={['required']}
          >
          </TextValidator>
           <br />
          <TextValidator
              id="password"
              type="passwoard"
              name="password"
              label="Password*"
              onChange={loginFormHandler}
              value={userLogindetails.password}
              validators={['required']}
              errorMessages={['required']}
          ></TextValidator>
             <br /><br /><br />
           <Button type="submit" variant="contained" color="primary" className='loginlogoutbtn'>LOGIN</Button>
       </ValidatorForm>
          </div>
          }
          {tabstate === 1 && 

          //Regitration Form
          <div>
          <ValidatorForm className="registration-form" onSubmit={onRegFormSubmit}>
                <TextValidator
                    id="firstname"
                    label="First Name*"
                    type="text"
                    name="firstname"
                    onChange={regFormHandler}
                    value={userRegDetails.firstname}
                    validators={['required']}
                    errorMessages={['required']}
                >
                </TextValidator>
                <br />
                <TextValidator
                        id="lastname"
                        label="Last Name*"
                        type="text"
                        name="lastname"
                        onChange={regFormHandler}
                        value={userRegDetails.lastname}
                        validators={['required']}
                        errorMessages={['required']}
                    >
                </TextValidator>
                <br />
                <TextValidator
                        id="email"
                        label="Email*"
                        type="email"
                        name="email"
                        onChange={regFormHandler}
                        value={userRegDetails.email}
                        validators={['required']}
                        errorMessages={['required']}
                    >
                </TextValidator>
                <br />
                <TextValidator
                        id="password"
                        type="passwoard"
                        name="password"
                        label="Password*"
                        onChange={regFormHandler}
                        value={userRegDetails.password}
                        validators={['required']}
                        errorMessages={['required']}
                ></TextValidator>
                <br />
                <TextValidator
                        id="contactnumbers"
                        label="Contact No*"
                        type="text"
                        name="contactnumbers"
                        onChange={regFormHandler}
                        value={userRegDetails.contactnumbers}
                        validators={['required']}
                        errorMessages={['required']}
                >
                </TextValidator>
          <br/>
          <p>{regSucess}</p>
          <br />
          <Button type="submit" variant="contained" color="primary" className='loginlogoutbtn'>REGISTER</Button>
        </ValidatorForm>
             </div>
             }
          </DialogContent>

        </Dialog>

    </div>
  )
} 


