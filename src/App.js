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
import {UserFunctions} from './context/UserContext'
import OrderView from './components/OrderView/OrderView';
import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import User from './components/User/User'

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

            <Route exact path='/register'>
              <Register />
            </Route>

            <Route exact path='/user'>
              <User />
            </Route>

            <Route exact path='/order'>
              <OrderView />
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
