import React, { Component } from 'react'
import Spinner from '../Spinner'

export default class ListaFiltrada extends Component {
    render() {
        const { listado, filtrarClub } = this.props

        const listaclubes = listado
        .filter(club => {
            return club.club.toLowerCase().indexOf(filtrarClub.toLowerCase()) >= 0
        })
        .map((club, i) => {
            return (
                <li key={i}>
                    <p>{club.club}</p>
                    <ul>
                        <li>
                            <p>{club.participantes}</p>
                        </li>
                    </ul>
                </li>
            )
        }).sort()
        if (!this.props.listado) { return <Spinner /> } else {
            return (
                <div>               
                    { listaclubes }          
                </div>
            )            
        }
    }
}