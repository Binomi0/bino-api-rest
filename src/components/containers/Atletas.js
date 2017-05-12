import React, { Component } from 'react'
import { CreateAtleta, Atleta } from '../presentation'
import { APIManager } from '../../utils'
import Spinner from '../../components/Spinner'

class Atletas extends Component {
    constructor() {
        super()
        this.state = {
            user: null,
            codigo: null,
            club: {},
            list: [],
            update: false,
            selected: 0
        }
        this.selectedInded = this.selectedInded.bind(this)
    }

    componentDidMount(){
        console.log('Ejecutando componentWillMount')
        APIManager.get(`/api/club/${this.props.codigo}`, null, (err, response) => {
            if(err){
                alert('ERROR: ', err.message)
                return
            }
            console.log('Lista de Atletas: ', response.result[0].participantes)
            let updatedList = response.result[0].participantes
            //updatedList.push(response.results)
            this.setState({
                list: updatedList
            })
        })
    }

    borrarAtleta() {
        APIManager.delete(`/api/club/${this.props.codigo}`, null, (err, response) => {
            if(err) {
                alert('ERROR: ', err)
                return
            }
            console.log('Borrando Atleta')
            
        })
    }

    addAtleta(atleta, codigo){
        console.log('Atleta añadido',atleta, codigo)
        //let updatedAtleta = Object.assign({}, atleta)
        APIManager.put(`/api/club/${codigo}`, atleta, (err, response) => {
            if(err){
                alert('ERROR: ', err.message)
                return
            }
            console.log('POST CREATED: ', JSON.stringify(response))
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.result)
            this.setState({
                list: updatedList,
                codigo,
                update: true
            })
            console.log('Lista Recibida: ', response)
        })
    }

    selectedInded(){

    }

    render() {
        
        console.log(this.state.list)
        const participantes = this.state.list.length == 0 ? <h2>No hay participantes</h2> : ''
        const listaParticipantes = this.state.list.map((atleta, index) => {
            let selected = (index==this.state.selected)
            return (
                <li key={index} onClick={this.selectedInded.bind(this)}>                    
                    <Atleta isSelected={selected} 
                    listaAtletas={ atleta } 
                    codigo={this.props.codigo}
                    borrarAtleta={this.borrarAtleta.bind.this}
                    />
                </li> 
            )
        })
        return (
            <div className="ed-item"> 
                <div className="ed-container no-padding">
                    <div className="ed-item l-50">    
                        <div className="w3-card-4 w3-light-grey w3-text-blue w3-padding">
                        {participantes}                                       
                            <ol className="w3-text-blue w3-padding">
                                {listaParticipantes}
                            </ol>
                        </div>
                    </div>                    
                    <div className="ed-item l-50">
                        <div className="w3-card-4 w3-light-grey w3-text-blue w3-padding">
                            <CreateAtleta onCreate={this.addAtleta.bind(this)} codigo={this.props.codigo} club={this.props.club} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Atletas