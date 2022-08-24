import React, {useState} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Modal from '@material-ui/core/Modal';

export default function Header(props) {

  const history = useHistory();
  const [modalstate, setmodalstate] = useState(false);
  const [isLoggedIn,setisLoggedIn] = useState(false);
  const [tabstate, settabstate] = useState(0);
  // login input state
  const [loginemail, setloginemail] = useState("");
  const [loginpass, setloginpass] = useState("");

  // reginput stae
  const [userfname, setuserfname] = useState("");
  const [userlname, setuserlname] = useState("");
  const [useremail, setuseremail] = useState("");
  const [userpsw, setuserpsw] = useState("");
  const [userph, setuserph] = useState("");

  //login validation state
  const [reqloginemail, setreqloginemail] = useState("dispNone");
  const [reqloginpass, setreqloginpass] = useState("dispNone");

// registration form validation state
  const [requserfname, setrequserfname] = useState("dispNone");
  const [requserlname, setrequserlname] = useState("dispNone");
  const [requseremail, setrequseremail] = useState("dispNone");
  const [requserpsw, setrequserpsw] = useState("dispNone");
  const [requserph, setrequserph] = useState("dispNone");

  const tabhandeler = (event, newvalue) => {
        settabstate(newvalue);
      }
  const modalHandaler = () =>{
    setmodalstate(true);
  }
  const [regSucess, setregSucess] = useState("");

  //login functions 
  const loginemaiHandaler = (e) =>{
    setloginemail(e.target.value);
  }
  const logionpswhandaler = (e) =>{
    setloginpass(e.target.value);
  }

  const  onLoginFormSubmit = async (e) => {

    loginemail === "" ? setreqloginemail("dispBlock") : setreqloginemail("dispNone");
    loginpass === "" ? setreqloginpass("dispBlock") : setreqloginpass("dispNone");

    if (
      loginemail === "" ||
      loginpass === "" 
    ) {
      return;
    }
  const authcode = window.btoa(`${loginemail}:${loginpass}`);
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

    const regfnHandaler = (e) =>{
      setuserfname(e.target.value);
    }
    
    const reglnHandaler = (e) =>{
      setuserlname(e.target.value);
    }
    
    const regemailHandaler = (e) =>{
      setuseremail(e.target.value);
    }

    const regpswhandaler = (e) =>{
      setuserpsw(e.target.value);
    }
    
    const regphHandaler = (e) =>{
      setuserph(e.target.value);
    }

   
    
    const  onRegFormSubmit = async (e) => {
      userfname === "" ? setrequserfname("dispBlock") : setrequserfname("dispNone");
      userlname === "" ? setrequserlname("dispBlock") : setrequserlname("dispNone");
      useremail === "" ? setrequseremail("dispBlock") : setrequseremail("dispNone");
      userpsw === "" ? setrequserpsw("dispBlock") : setrequserpsw("dispNone");
      userph === "" ? setrequserph("dispBlock") : setrequserph("dispNone");
  
      if (
        userfname === "" ||
        userlname === "" ||
        useremail === "" ||
        userpsw === "" ||
        userph === ""
      ) {
        return;
      }

      setuserfname("");
      setuserlname("");
      setuseremail("");
      setuserpsw("");
      setuserph("");
      
      const params = {
        email_address: useremail,
        first_name: userfname,
        last_name: userlname,
        mobile_number:userph,
        password: userpsw
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

        <Modal className="log-regModal" open={modalstate} aria-labelledby="login-register">
        <Card className="logregcardStyle">
          <CardContent>
      <div className="lohin-reg-modals" >
              <Tabs value={tabstate} onChange={tabhandeler} centered>
                  <Tab label="LOGIN"   />
                  <Tab label="REGISTER"  />
              </Tabs>
          {tabstate === 0 && 

          //Logoin Form 
          <div className="form_container">
            <FormGroup  className="logoin-form">
            <FormControl  className="formControl">
              <InputLabel htmlFor="tickets">
              Username
              </InputLabel>
              <Input
                id="loginemail"
                type="text"
                value={loginemail}
                onChange={loginemaiHandaler}
              />
            
              <FormHelperText className={reqloginemail}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl> 
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="tickets">
              Password 
              </InputLabel>
              <Input
                id="loginpass"
                value={loginpass}
                type='password'
                onChange={logionpswhandaler}
              />
              <FormHelperText className={reqloginpass}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl> 
            </FormGroup>
            <br />  <br />
            <Button  variant="contained" color="primary" onClick={onLoginFormSubmit} className='loginlogoutbtn'>LOGIN</Button>
            
          </div>
          }
          {tabstate === 1 && 

          //Regitration Form
          <div className="form_container">
           <FormGroup  className="registration-form">
            <FormControl  className="formControl">
              <InputLabel htmlFor="tickets">
              First Name
              </InputLabel>
              <Input
                id="userfname"
                type="text"
                value={userfname}
                onChange={regfnHandaler}
              />
              <FormHelperText className={requserfname}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl> 
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="tickets">
              Last Name
              </InputLabel>
              <Input
                id="userlname"
                type="text"
                value={userlname}
                onChange={reglnHandaler}
              />
            
              <FormHelperText className={requserlname}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl> 
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="tickets">
                Email
              </InputLabel>
              <Input
                id="useremail"
                type="email"
                value={useremail}
                onChange={regemailHandaler}
              />
              <FormHelperText className={requseremail}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl> 
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="tickets">
              Password 
              </InputLabel>
              <Input
                id="userpsw"
                value={userpsw}
                type='password'
                onChange={regpswhandaler}
              />
              <FormHelperText className={requserpsw}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl> 
            <br />
            <FormControl  className="formControl">
              <InputLabel htmlFor="tickets">
              Contact Numbers
              </InputLabel>
              <Input
                id="movieTitle"
                type="text"
                value={userph}
                onChange={regphHandaler}
              />
              <FormHelperText className={requserph}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl> 
            </FormGroup>
          <br/>
          <p>{regSucess}</p>
          <br />
          <Button type="submit" variant="contained" color="primary" onClick={onRegFormSubmit} className='loginlogoutbtn'>REGISTER</Button>
             </div>
             }
             </div>
          </CardContent>
             </Card>
          </Modal >
    </div>
  )
} 


