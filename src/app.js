import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home'
import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyAwXxY-vBd5Nj5T0yhbTuLrgnHZ88Fy-Qc",
    authDomain: "karate-santa-pola.firebaseapp.com",
    databaseURL: "https://karate-santa-pola.firebaseio.com",
    projectId: "karate-santa-pola",
    storageBucket: "karate-santa-pola.appspot.com",
    messagingSenderId: "264498012839"  
})

class App extends Component {    
    render() {
        return (
            <div>                
                <Home />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)