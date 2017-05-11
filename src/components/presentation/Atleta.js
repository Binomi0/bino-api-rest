import React, { Component } from 'react'
import styles from './styles'

class Atleta extends Component {
    render() {
        console.log(this.props)
        return ( 
            <div style={styles.zone.container}>
                <div>
                    <h2 style={styles.zone.header}>{this.props.listaAtletas.nombre}</h2>   
                </div>
                <div>
                    <p>{this.props.listaAtletas.cinturon}</p>
                    <p>{this.props.listaAtletas.edad}</p>
                    <p>{this.props.listaAtletas.discapacidad}</p>
                </div>
            </div>  
        )
    }
}

export default Atleta