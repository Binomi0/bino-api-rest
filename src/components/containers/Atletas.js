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
            selected: null,
            loading: true
        }
        this.selectedIndex = this.selectedIndex.bind(this)
    }

    componentDidMount(){
        //console.log('Ejecutando componentWillMount')
        this.actualizarLista()
    }
    actualizarLista(){
        console.log('Actualizando Lista de Atletas')
        APIManager.get(`/api/atleta/${this.props.codigo}`, null, (err, response) => {
            console.log('solicitud de borrado enviada, respuesta: "ERROR": ', err, 'RESPUESTA: ', response.result)

            if(err){
                console.log('ERROR GET ATLETA: ', err)
                return
            }
            console.log('Lista de Atletas: ', response.result)
            //let updatedList = Object.assign([], this.state.list)
            //let updatedList = this.state.list
            
            //updatedList.push(response.result)
            //console.log('Updated List', updatedList[0])
            this.setState({
                list: response.result,
                loading:false
            })
        })
    }

    borrarAtleta(index) {
        //console.log(this.state.list[index])
        console.log('Borrando Atleta', this.state.list[index]._id) 
        APIManager.delete(`/api/atleta/delete/${this.state.list[index]._id}`)

        console.log('Ahora hay que actualizar la lista de atletas')
        this.actualizarLista()
        // APIManager.get(`/api/atleta/${this.props.codigo}`, null, (err, response) => {
        //     if(err){
        //         alert('ERROR GET ATLETA: ', err)
        //         return
        //     }
        //     console.log('Lista de Atletas: ', response.result)
        //     console.log('Estado despues de recibir la lista de  Atletas: ', this.state.list)

        //     //let updatedList = Object.assign([], this.state.list)
        //     //let updatedList = this.state.list
            
        //     //updatedList.push(response.result)
        //     //console.log('Updated List', updatedList[0])
        //     this.setState({
        //         list: response.result,
        //         loading:false
        //     })
        // })
    }

    addAtleta(atleta, codigo){
        console.log('Atleta añadido',atleta, codigo)
        //let updatedAtleta = Object.assign({}, atleta)
        APIManager.put(`/api/atleta`, atleta, (err, response) => {
            if(err){
                alert('ERROR ADDATLETA: ', err)
                return
            }
            console.log('ATLETA CREADO: ', JSON.stringify(response))
            let updatedList = Object.assign([], this.state.list)
            updatedList['codigo'] = codigo
            updatedList.push(response.result)
            this.setState({
                list: updatedList,
                codigo,
                update: true
            })
            //console.log('Lista Recibida: ', response)
        })
    }

    selectedIndex(index){
        //console.log('Selected Index')
        this.setState({ selected: index })
    }

    render() {

        //console.log(this.state.loading)
        // if (this.state.loading) {
        //     return <Spinner />
        // } else {
            console.log('Listado en Render: ',this.state.list)
            const participantes = this.state.list.length == 0 ? <h2>No hay participantes</h2> : ''
            const listaParticipantes = this.state.list.map((atleta, i) => {
                let selected = (i==this.state.selected)
                return (
                    <li className="atleta__item" key={i}>                    
                        <Atleta index={i} select={this.selectedIndex.bind(this)}
                        isSelected={selected}
                        listaAtletas={ atleta } 
                        codigo={this.props.codigo}
                        borrarAtleta={this.borrarAtleta.bind(this)}
                        />
                    </li> 
                )
            })
            return (
                <div className="ed-item"> 
                    <div className="ed-container no-padding">
                        <div className="ed-item l-50 margin">    
                            <div className="w3-card-2 w3-light-grey w3-text-blue">
                                {participantes}                                       
                                <ul className="atleta__group">
                                    {listaParticipantes}
                                </ul>
                            </div>
                        </div>                    
                        <div className="ed-item l-50">
                            <div className="w3-card-2 w3-light-grey w3-text-blue w3-padding">
                                <CreateAtleta onCreate={this.addAtleta.bind(this)} codigo={this.props.codigo} club={this.props.club} />
                            </div>
                        </div>
                    </div>
                </div>
            )
       // }
        
        
    }
}

export default Atletas