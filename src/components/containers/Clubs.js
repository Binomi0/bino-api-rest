import React, { Component } from 'react'
import { CreateClub, Club, CreateAtleta } from '../presentation'
import Atletas from './Atletas'
import { APIManager } from '../../utils'
import firebase from 'firebase'
import Spinner from '../Spinner'

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
        //console.log('componentWillMount | Clubs')
        if(!this.props.user){
            console.log('No hay usuario conectado')
            return 
        } else {
            //console.log(this.props.user.providerData[0].email)
            APIManager.get('/api/club', { 'email': this.props.user.providerData[0].email }, (err, response) => {
                //console.log(response)
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
        //console.log('Renderizando Clubs', this.state.list)
        return (
            <div className="ed-container form__container">
                <div className="ed-item">
                    <h4>Bienvenido, {this.state.list.club} <span className="w3-badge w3-blue">{this.state.list.codigo}</span></h4>                
                </div>
                {
                    this.state.activado === false ? 
                    <CreateClub onCreate={this.addClub.bind(this)} activado={this.state.activado} user={this.props.user} /> : 
                    <Atletas codigo={this.state.codigo} club={this.state.list} />                     
                }
            </div>
        )
    }
}

export default Clubs