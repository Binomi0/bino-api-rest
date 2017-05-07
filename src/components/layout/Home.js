import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import Posts from '../containers/Posts'
import Comments from '../containers/Comments'
import Clubs from '../containers/Clubs'
import Login from '../containers/Login'
//import Atletas from '../containers/Atletas'
import firebase from 'firebase'

export default class Home extends Component {
    constructor(){
        super()
        this.state = {
            user: null
        }
    }

    componentWillMount(){        
        firebase.auth().onAuthStateChanged(user => {            
            this.setState({ user })
        })
    }



    render() {
        return ( 
            <div>                
                <div className="w3-bar w3-border-bottom">
                    <Login /> 
                </div> 
                <div>
                    { !this.state.user ? 'Debes estar autenticado para inscribirte' : <Clubs user={this.state.user}/> }                    
                </div>
            </div>      
        )
    }
}

