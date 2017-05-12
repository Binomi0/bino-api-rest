import React, { Component } from 'react'
import firebase from 'firebase'
import Auth from '../auth'
import '../../stylesheets/index.scss'
import Spinner from '../Spinner'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            user: null,
            loading: true,
            homeMounted: true
        }

        this.renderLoginButton = this.renderLoginButton.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleAuth = this.handleAuth.bind(this)
    }

    componentWillMount(){ 
        //console.log(this.state.loading)
        //this.setState({ loading: true })
        firebase.auth().onAuthStateChanged(user => {            
            this.setState({ user })
            this.props.isUserauth(user)
        })
    }
    componentDidMount(){
        this.setState({loading:false})
    }

    handleAuth (newprovider) {
        //console.log(this.state.loading)
        this.setState({ loading: true })

        //this.mostrarSpinner()
        let provider = null
        if (newprovider == 'google') {
            provider = new firebase.auth.GoogleAuthProvider() 
            Auth.auth(provider)              
        } 
        if (newprovider == 'facebook') {
            provider = new firebase.auth.FacebookAuthProvider() 
            provider.addScope('email');
            provider.addScope('user_friends');
            Auth.auth(provider)   
        } 
        if (newprovider == 'twitter') {
            provider = new firebase.auth.TwitterAuthProvider()
            Auth.auth(provider)  
        }         
        else {            
            return
        }  
    }

    handleLogout() {
        //console.log(this.state.loading)
        firebase.auth().signOut().then(response => console.log('Saliendo...', response))
        this.setState({
            user: null,
            loading:false
        })
        this.props.isUserauth(this.state.user)
    }

    renderLoginButton(){
        console.log(!this.state.user)
        if(this.state.user) {
            return (
                <div className="w3-dropdown-hover w3-white user-in">
                    <p><a href="#"><img className="circle" width="32" height="32" src={this.state.user.photoURL} alt="avatar"/> {this.state.user.providerData[0].email}</a></p>
                    <div className="w3-dropdown-content w3-bar-block w3-card-4">  
                    <p onClick={this.handleLogout}><a href="#" className="w3-bar-item w3-button icon-cancel"><span >Salir</span></a></p>      
                    </div>
                </div>
            )
        } else {
            //console.log(this.state.loading)
            return(
                <div className="w3-bar w3-border-bottom bg-spinner">    
                    <div className="ed-container full">
                    {this.state.loading ? <Spinner /> : 
                        <div className="ed-item l-30 main-end padding">
                            <div className="ed-container">
                                <div className="ed-item main-center ">
                                    <button className="cross-end icon-gplus login-button google" onClick={(name) => this.handleAuth('google')}>Entra con Google</button>
                                </div>
                                <div className="ed-item main-center">
                                    <button className="cross-end icon-facebook login-button facebook" onClick={(name) => this.handleAuth('facebook')}>Entra con Facebook</button>
                                </div>
                                <div className="ed-item main-center">
                                    <button className="cross-end icon-twitter login-button twitter" onClick={(name) => this.handleAuth('twitter')}>Entra con Twitter</button>
                                </div>
                            </div>
                        </div>
                    }                        
                        <div className="ed-item l-70 main-start padding">                        
                        </div>                    
                    </div>
                </div>                
            )
        }
    }

    render() {
        return(
            <div>                
                { this.renderLoginButton() }
            </div>
        )
    }
}



export default Login