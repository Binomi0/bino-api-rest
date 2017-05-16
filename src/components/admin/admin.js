import React, { Component } from 'react'
import ListaClubes from '../containers/ListaClubes'
import { APIManager } from '../../utils'
import Spinner from '../Spinner'

export default class Admin extends Component {
    constructor() {
        super()
        this.state = {
            clubes: ''
        }
    }

    componentWillMount() {
        console.log('Montando Admin')
        APIManager.get('api/club', {}, (err, res) => {
            if (err){
                alert('ERROR: Ha fallado la conexión al servidor: ', err.message)
                return
            }
            console.log('Salida de request, lista de clubes: ', res.results)
            this.setState({ clubes: res.results })
        })
    }
    shouldComponentUpdate() {
        console.log('Componente actualizandose')
        if (!this.state.clubes) {
            return true
        } else {
            return 
        }
    }
    componentWillUpdate() {

    }
    render() {
        console.log('lista de clubes en render: ', this.state.clubes)
        if (!this.state.clubes) { return <Spinner /> } else {
            return(
                <div>
                    <ul>
                        <ListaClubes listado={this.state.clubes}/>
                    </ul>
                </div>
            )
        }
    }
}