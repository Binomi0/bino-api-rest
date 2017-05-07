import React, { Component } from 'react'
import { CreateClub, Club, CreateAtleta, Atleta } from '../presentation'
import { APIManager } from '../../utils'
import firebase from 'firebase'

class Clubs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            list: [],
            codigo: null,
            user: null,
            clubRegistrado: false
        }

    }

    componentWillMount(){        
        firebase.auth().onAuthStateChanged(user => {            
            this.setState({ user, paso: 1 })    
            APIManager.get('/api/club', { 'email': this.state.user.email }, (err, response) => {
                if (err){
                    alert('ERROR: Ha fallado la conexión al servidor: ', err.message)
                    return
                }
                this.setState({
                    codigo: response.results[0].codigo,
                    clubRegistrado: true
                })
            })         
        })
    }


    addClub(club){
        let updatedClub = Object.assign({}, club)

        APIManager.post('/api/club', updatedClub, (err, response) => {
            if(err){
                alert('Ya existe un usuario con ese correo electrónico', err.message)
                return
            }

            console.log('Creado nuevo club: ', JSON.stringify(response))
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.result)
            this.setState({
                list: updatedList,
            })
        })
    }

    render() {
        console.log(this.state.codigo)
        const listItems = this.state.list.map((club , i) => {
            let selected = (i==this.state.selected)
            return (
                <span key={i}>
                    <Club index={i} />
                </span> 
                )
        }).reverse()
      
        return (
            <div className="ed-container form__container">
                <div className="ed-item form__form l-60">   
                    <CreateClub onCreate={this.addClub.bind(this)} 
                        codigo={this.state.codigo}
                        clubRegistrado={this.state.clubRegistrado}                        
                        />           
                </div>
                <div className="ed-item form__list l-40 main-end">
                    <h2 className="clear karate full">Clubs Inscritos</h2>
                    <div>
                        {listItems} 
                    </div>
                </div>                     
               
            </div>
        )
    }
}

export default Clubs