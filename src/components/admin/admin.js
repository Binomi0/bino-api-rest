import React, { Component } from 'react'
import ListaClubes from '../containers/ListaClubes'
import { APIManager } from '../../utils'
import Spinner from '../Spinner'

export default class Admin extends Component {
    constructor() {
        super()
        this.state = {
            clubes: '',
            atletas: ''
        }
    }
    listarClubs(){
        APIManager.get('api/club', {}, (err, res) => {
            if (err){
                alert('ERROR: Ha fallado la conexión al servidor: ', err.message)
                return
            }
            //console.log('Salida de request, lista de clubes: ', res.results)
            this.setState({ clubes: res.results })
            return res.results
        })
    }
    listarAtletas(){
        APIManager.get('api/atleta', {}, (err, res) => {
            if (err){
                alert('ERROR: Ha fallado la conexión al servidor: ', err.message)
                return
            }
            //console.log('Salida de request, lista de atletas: ', res.results)
            this.setState({ atletas: res.results })
            return res.results
        })
    }
    componentWillMount() {
        console.log('Montando Admin')
        let atletas = this.listarAtletas()
        let clubes = this.listarClubs()
        this.setState({ atletas, clubes })
        
    }
    // shouldComponentUpdate() {
    //     console.log('Componente actualizandose')
    //     if (!this.state.clubes) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    componentWillUpdate() {

    }
    render() {
        //console.log('lista de clubes en render: ', this.state.clubes)
        //console.log('lista de atletas en render: ', this.state.atletas)
        if (!this.state.clubes) { return <Spinner /> } else {
            return(
                <div>
                    <ul>
                        <ListaClubes clubes={this.state.clubes} atletas={this.state.atletas}/>
                    </ul>
                </div>
            )
        }
    }
}