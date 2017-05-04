import React, { Component } from 'react'
import styles from './styles'

class Atleta extends Component {

    onSelectTitle(event){
        event.preventDefault()
        this.props.onSelect(this.props.index)
    }

    render() {
        const atletaStyle = styles.zone;
        const title = (this.props.isSelected) ? <a style={atletaStyle.club} href="#">{this.props.currentAtleta.club}</a> : <a href="#">{this.props.currentAtleta.club}</a>

        return ( 
            <div style={atletaStyle.container}>
                <h2 onClick={this.onSelectTitle.bind(this)} style={atletaStyle.header}>
                    { title }
                </h2>
                <span className="detail">Atleta: {this.props.currentAtleta.participantes.nombre}</span><br />
                <span className="detail">Edad: {this.props.currentAtleta.participantes.edad} años</span><br />
                <span className="detail">Cinturón: {this.props.currentAtleta.participantes.cinturon}</span><br />
                <span className="detail">Discapacidad: {this.props.currentAtleta.participantes.discapacidad}</span><br />
            </div>      
        )
    }
}

export default Atleta