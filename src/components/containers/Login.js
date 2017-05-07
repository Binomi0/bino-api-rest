import React, { Component } from 'react'
import firebase from 'firebase'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            user: null
        }

        this.renderLoginButton = this.renderLoginButton.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleAuth = this.handleAuth.bind(this)
    }

    componentWillMount(){        
        firebase.auth().onAuthStateChanged(user => {            
            this.setState({ user })
        })
    }

    handleAuth () {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha iniciado sesión`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleLogout() {
        firebase.auth().signOut()
        this.setState({
            user: null
        })
    }

    renderLoginButton(){
        if(this.state.user) {
            return (
                <div className="w3-dropdown-hover w3-white">
                    <a href="#"><img className="circle" width="32" height="32" src={this.state.user.photoURL} alt="avatar"/></a>
                    <div className="w3-dropdown-content w3-bar-block w3-card-4">  
                    <p className="w3-bar-item">Hola {this.state.user.displayName}</p>                                      
                    <a href="#" className="w3-bar-item w3-button"><span onClick={this.handleLogout}>Desconectar</span></a>      
                    </div>
                </div>
            )
        } else {
            return(
                <div className="ed-container full">
                    <div className="ed-item cross-center main-center">
                        <button className="selector2 cross-end icon-login" onClick={this.handleAuth}>Login con Google</button>
                    </div>
                </div>
            )
        }

    }


    render() {
        return(
            <div>                
                {this.renderLoginButton()}
            </div>
        )
    }
}

export default Login