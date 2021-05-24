import './App.css';
import  {BrowserRouter, Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import React from 'react';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Cart from'./components/Cart/Cart';
import {CarritoFunctions} from './context/CarritoContext';
import Login from './components/Login/Login';
import {UserFunctions} from './context/UserContext'

function App() {
  return (
    <BrowserRouter>
    <CarritoFunctions>
      <UserFunctions>
      <React.Fragment>
        
          <NavBar />
          <Switch>

            <Route exact path='/categories/:category'>
              <ItemListContainer />
            </Route>

            <Route exact path='/categories'>
              <ItemListContainer />
            </Route>

            <Route path='/detail/:id'>
              <ItemDetailContainer />
            </Route>

            <Route exact path='/cart'>
              <Cart />
            </Route>

            <Route exact path='/login'>
              <Login />
            </Route>

            <Route path='/'>
              <Home />
            </Route>

          </Switch>
          <Footer />
      </React.Fragment>
      </UserFunctions>
    </CarritoFunctions>
    </BrowserRouter>
  )
}

export default App;
