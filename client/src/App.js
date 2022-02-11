import React from 'react';
import Landing from './components/landing/Landing';
import Countries from './components/countries/Countries'
import CountryDetail from "./components/CountryDetail/CountryDetail"
import Nav from "./components/Nav/Nav"
import { Route } from 'react-router-dom';
import Form from "./components/Form/Form"
import './App.css';


function App() {


  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/activity" component={Form} />
      <Route exact path="/countries" component={Nav} />
      <Route exact path="/countries" component={Countries} />
      <Route exact path="/countries/:idName" component={CountryDetail} />
    </div>
  );
}

export default App;
