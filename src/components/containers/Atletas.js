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
            update: false
        }
    }

    componentDidMount(){
        console.log('Ejecutando componentWillMount')
        APIManager.get('/api/club/', null, (err, response) => {
            if(err){
                alert('ERROR: ', err.message)
                return
            };
            console.log('Lista de Atletas: ', response.results[0].participantes)
            let updatedList = response.results[0].participantes
            //updatedList.push(response.results)
            this.setState({
                list: updatedList
            });
            //console.log('Subiendo lista', this.state.list)
            //console.log('Lista Recibida: ', response)
        })
        //console.log('Se va a montar el componente Atletas', this.props.codigo)
        // if (this.state.list.length < 1 ){
        //     this.setState({
        //         list: this.props.currentAtleta
        //     })
        //     // setTimeout(() => {
        //     // this.listarAtletas(this.props.codigo)
        //     // }, 100)            
        // }



        // APIManager.get('/api/club/', null, (err, response) => {
        //     if(err){
        //         alert('ERROR: ', err.message)
        //         return
        //     };
        //     //console.log('Lista de Atletas: ', JSON.stringify(response.results))
        //     let updatedList = response.results[0]
        //     //updatedList.push(response.results)
        //     this.setState({
        //         list: updatedList
        //     });
            //console.log('Subiendo lista', this.state.list)
            //console.log('Lista Recibida: ', response)
        //})
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
        //listarAtletas(codigo)
    }

    render() {
        //console.log(this.state.list === undefined)
        console.log(this.state.list.length)
        const participantes = this.state.list.map((atleta, index) => {
            return (
                <li key={index}>                    
                    <Atleta listaAtletas={ atleta } codigo={this.props.codigo}/>
                </li> 
            )
        })
        return (
            <div> 
                <CreateAtleta onCreate={this.addAtleta.bind(this)} codigo={this.props.codigo}/>
                <ol>
                   {participantes}
                </ol>
            </div>
        )
    }
}

export default Atletas