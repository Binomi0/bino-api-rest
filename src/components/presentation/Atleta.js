import React, { Component } from 'react'

class Atleta extends Component {

    onSelectTitle(event){
        //console.log('Selected Title')
        event.preventDefault()
        this.props.select(this.props.index)
    }

    onDeleteAtleta(event) {
        event.preventDefault()
        this.props.borrarAtleta(this.props.index)
    }

    render() {
        console.log(this.props)
        const categorias = this.props.listaAtletas.categoria.map((categoria, i) => {
            return <span key={i}>{categoria}<br /></span>
        })
        const title = (this.props.isSelected) ? 
            <div className="atleta__title selected">{this.props.listaAtletas.nombre}
                <div className="w3-dropdown-hover w3-light-grey w3-right">                    
                    <div className="w3-large icon-ellipsis-vert user-options-dropdown"></div>
                    <div className="w3-dropdown-content ">
                        <p onClick={this.onDeleteAtleta.bind(this)}><a href="#" className="w3-bar-item w3-button icon-cancel">
                            <span>Eliminar</span></a>
                        </p>
                    </div>
                </div>
            </div> : 
            <h2 className="atleta__title"><a href="#">{this.props.listaAtletas.nombre}</a></h2>
        return (             
            <div onClick={this.onSelectTitle.bind(this)}>
                <div className="atleta__item__container">{title}</div>                 
                <p className="atleta__desc">Cinturón: <strong>{this.props.listaAtletas.cinturon}</strong>, <strong>{this.props.listaAtletas.edad}</strong> años</p>
                <p className="atleta__desc">Discapacidad: <strong>{this.props.listaAtletas.discapacidad}</strong></p>
                <p className="atleta__desc">Categoría: <strong>{categorias}</strong></p>
                <p className="atleta__desc">SubCategorías: <strong>{this.props.listaAtletas.subcategoria[0]}</strong></p>
            </div>
        )    
    }
}

export default Atleta