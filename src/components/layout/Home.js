import React, { Component } from 'react'
import Clubs from '../containers/Clubs'
import Login from '../containers/Login'
//import Atletas from '../containers/Atletas'
import Spinner from '../Spinner'


export default class Home extends Component {
    constructor(){
        super()
        this.state = {
            user: null,
            loading: true
        }

        this.isUserauth = this.isUserauth.bind(this)
        //this.needUpdate = this.needUpdate.bind(this)
        //console.log('Home Constructor')
    }
    componentDidMount(){
        //console.log('componentDidMount\n', this.state)
        this.setState({loading:false})
    }

    isUserauth(user){
        //console.log('isUserAuth: \n', user)
        if (user == null) {
            //console.log('User null, Reiniciando componente?', user == null)
            this.setState({ user: null })
        } else {
            //console.log('Recibo la respuesta del componente Login con el usuario: ', user)
            user !== null ? this.setState({ user }) : ''        
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps: ', nextProps)
    //     this.setState({
    //         club: nextProps.currentAtleta
    //     })
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     //console.log('Should Update?: ', nextProps, 'nextState', nextState)
    //     if(this.state.loading == true) { return true } else { return false }
    // }

    // componentWillUpdate(nextProps, nextState){
    //     this.props = nextProps
    //     this.state = nextState

    //     // if (this.state.loading == true) {
    //     //     this.setState({ loading:true })
    //     // }
    //     // console.log('Will Update?: ', nextProps, 'nextState', nextState)
    // }
    // componentDidUpdate(nextProps, nextState){
    //     if (this.state.loading == false) {
    //         this.setState({ loading:false })
    //     }
    //     //console.log('Did Update: ', nextProps, 'nextState', nextState)
    // }

    render() {
        console.log('Renderizando Home', this.state.loading)
        if (this.state.loading) { return <Spinner /> } else {
            return ( 
                <div>
                    <Login isUserauth={this.isUserauth.bind(this)} />  
                    {!this.state.user ? '' : <Clubs user={this.state.user} /> }
                </div>      
            )
        }        
    }
}

