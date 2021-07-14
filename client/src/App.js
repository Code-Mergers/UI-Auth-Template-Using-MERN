import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute"
import Private from "./components/private/Private"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import ForgotPassword from "./components/forgotpassword/ForgotPassword"
import ResetPassword from "./components/resetpassword/ResetPassword"

class App extends  React.Component {
  render(){
      return (
        <Router>
          <div className="app">
            <Switch>
              <PrivateRoute exact path="/" component={Private}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/forgotpassword" component={ForgotPassword}/>
              <Route exact path="/resetpassword/:resetToken" component={ResetPassword}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
