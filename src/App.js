import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDoc } from "./firebase/firebase.utils";

class App extends Component{
    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
       this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
           if (userAuth) {
               const urserRef = await createUserProfileDoc(userAuth);

               urserRef.onSnapshot(snapshot => {
                   this.setState({
                       currentUser: {
                           id: snapshot.id,
                           ...snapshot.data()
                       }
                   });

                   console.log(this.state);
               });

           } else {
               this.setState({currentUser: userAuth});
           }
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={ this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' component={SignInAndSignUp}/>
                </Switch>
            </div>
        );
    }
    }



export default App;
