import React, { Component } from 'react'

class Atleta extends Component {
    render() {
        //console.log(this.props)
        const title = (this.props.isSelected) ? <h2 className="atleta__title selected">{this.props.listaAtletas.nombre}<span onClick={this.props.borrarAtleta} className="w3-right icon-cancel"></span></h2> : <h2 className="atleta__title">{this.props.listaAtletas.nombre}</h2>
        return (             
            <div className="atleta__item">
                {title}  
                <p className="atleta__desc">Cinturón: <strong>{this.props.listaAtletas.cinturon}</strong></p>
                <p className="atleta__desc">Edad: <strong>{this.props.listaAtletas.edad}</strong> años</p>
                <p className="atleta__desc">Discapacidad: <strong>{this.props.listaAtletas.discapacidad}</strong></p>
            </div>
        )    
    }
}

export default Atleta