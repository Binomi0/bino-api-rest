import React, { Component } from 'react'
import { CreateClub, Club, CreateAtleta } from '../presentation'
import Atletas from './Atletas'
import { APIManager } from '../../utils'
import firebase from 'firebase'

class Clubs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            list: [],
            activado: false,
            codigo: null
        }
    }

    componentWillMount(){ 
        console.log('componentWillMount | Clubs')
        if(!this.props.user){
            console.log('No hay usuario conectado')
        } else {
            //console.log(this.state.user.email)
            APIManager.get('/api/club', { 'email': this.props.user.providerData[0].email }, (err, response) => {
                console.log(response)
                if (err){
                    alert('ERROR: Ha fallado la conexión al servidor: ', err.message)
                    return
                }
                //console.log(response.results[0].codigo)
                if (response.results.length === 0) {                        
                    return
                } else {
                    this.setState({
                        activado: true,
                        codigo: response.results[0].codigo,
                        list: response.results[0]
                    })
                }
            })  
        }   
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     //console.log('Create Club Should Update')
    //     //console.log(!this.state.formCompletado)
    //     if (!this.state.fullFilled) { return true } else { return false }
    // }    

    // componentWillUpdate(nextProps, nextState) {   
    //     //console.log('Will Update: ', state)   
    //     this.state = nextState
    // }

    // componentDidUpdate(prevProps, prevState) {                
    //     //console.log('Se ha actualizado asi: ', '\n' ,prevState, '\n')
    //     //console.log('El estado final : ', this.state)
    //     //console.log('Validacion de formulario: ', this.state.docsFilled == 2, this.state.formFilled)
    //     if (this.state.fullFilled) { this.setState({formCompletado: true})}
    // }

    addClub(club){
        //console.log('Añadiendo club en Clubs')
        let updatedClub = Object.assign({}, club)

        APIManager.post('/api/club', updatedClub, (err, response) => {
            if(err){
                alert('Ya existe un usuario con ese correo electrónico', err.message)
                return
            }

            //console.log('Creado nuevo club: ', JSON.stringify(response))
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.result)
            this.setState({
                list: updatedList, activado:true, codigo: response.result.codigo
            })
        })
    }

    render() { 
        //console.log('Renderizando Clubs')
        return (
            <div className="ed-container form__container">
                <div className="ed-item form__form">   
                <div>
                    <h4>Bienvenido, {this.props.user.displayName}</h4>
                </div>
                    {
                        this.state.activado === false ? 
                        <CreateClub onCreate={this.addClub.bind(this)} activado={this.state.activado} user={this.props.user} /> : 
                        <Atletas codigo={this.state.codigo}/>                     
                    }
                </div>
                <div className="ed-item form__list l-40 main-end">                    
                <div>
                </div>
                </div>                     

            </div>
        )
    }
}

export default Clubs