import React from 'react';
import { Switch, BrowserRouter,Route } from "react-router-dom";

import LoginC from './companyhr/core/Login';
import LoginS from './student/core/Login';
import LoginP from './placementco/core/LoginP';

import RegisterC from './companyhr/core/Register';
import RegisterS from './student/core/Register';

import Footer from './core/Footer';
import Header from './core/Header';
import Main from './core/Main';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic"; 

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

const Routes = () => {
  return (
    <div>
      <Provider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Header />
          <Switch><Main /></Switch>
          <Footer />
          <Switch>
            <Route exact path="/signupc" component={RegisterC} />
            <Route exact path="/signups" component={RegisterS} />
            <Route exact path="/signinc" component={LoginC} />
            <Route exact path="/signinp" component={LoginP} />
            <Route exact path="/signins" component={LoginS} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
export default Routes;