import React  from 'react';
import { Container ,  Grow, Grid } from '@material-ui/core';


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';



function App() {

  

    return (
        <BrowserRouter>
            <Container maxwidth = "lg">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
                
            </Container>
        </BrowserRouter>
     
    )
}

export default App
