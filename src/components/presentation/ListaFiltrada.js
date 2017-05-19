import React, { Component } from 'react'
import Spinner from '../Spinner'
import '../../stylesheets/index.scss'

export default class ListaFiltrada extends Component {
    clubSeleccionado(){
        event.preventDefault()
        this.props.seleccionarClub(this.props.clubSeleccionado)
    }
    render() {
        console.log(this.props)
        const { clubes, atletas, filtrarClub } = this.props

        const listaAtletas = atletas
        .filter(atleta => {
            return atleta.nombre.toLowerCase().indexOf(filtrarClub.toLowerCase()) >= 0
        })
        .map((atleta, i) => {
            return (
                <tr key={i} className="club-container__fila">
                    <td className="club-container__celda">{atleta.nombre}</td>
                    <td className="club-container__celda">{atleta.cinturon}</td>
                    <td className="club-container__celda">{atleta.edad}</td>
                    <td className="club-container__celda">
                        <ul>
                            {atleta.categoria.map(cat => {
                                return <li>{cat}</li>
                            })}
                        </ul>
                    </td>
                    <td className="club-container__celda">
                        <ul>
                            {atleta.subcategoria.map((cat, i) => {
                                return <li key={i}>{cat}</li>
                            })}
                        </ul>
                    </td>
                </tr>
            )
        })

        const listaclubes = clubes
        .filter(club => {
            return club.club.toLowerCase().indexOf(filtrarClub.toLowerCase()) >= 0
        })
        .map((club, i) => {
            return (
                <tr key={i} onClick={this.clubSeleccionado.bind(this)} className="club-container__fila">
                    <td className="club-container__celda"><p>{club.club}</p></td>
                    <td className="club-container__celda"><p>{club.email}</p></td>
                </tr>
            )
        }).sort()
        if (!this.props.clubes) { return <Spinner /> } else {
                       return (
                <div className="ed-container">               
                    <div className="ed-item s-50">               
                        <table className="club-container">
                            <tbody>
                                <tr className="club-container__fila">
                                    <th className="club-container__columna"> CLUBES INSCRITOS </th>                                      
                                    <th className="club-container__columna"> COMPETIDORES </th>                                      
                                </tr>
                                    { listaclubes }
                            </tbody>
                        </table>
                    </div>
                    <div className="ed-item s-50">     
                        <table className="atleta-container">
                            <tbody>    
                                <tr className="atleta-container__fila">                    
                                    <th className="atleta-container__columna"> COMPETIDOR </th> 
                                    <th className="atleta-container__columna"> CINTURON </th> 
                                    <th className="atleta-container__columna"> EDAD </th> 
                                    <th className="atleta-container__columna"> CATEGORIAS </th> 
                                    <th className="atleta-container__columna"> SUB CATEGORIAS </th> 
                                </tr>
                                    { listaAtletas }                                                           
                            </tbody>
                        </table> 
                    </div>
                </div>
            )            
        }
    }
}