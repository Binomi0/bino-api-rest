import React, { Component } from 'react'
import styles from './styles'

class Club extends Component {

    onSelectTitle(event){
        event.preventDefault()
        this.props.onSelect(this.props.index)
    }

    render() {
        const clubStyle = styles.zone;
        const title = (this.props.isSelected) ? <a style={clubStyle.club} href="#">{this.props.currentClub.club}</a> : <a href="#">{this.props.currentClub.club}</a>

        return ( 
            <div style={clubStyle.container}>
                <h2 onClick={this.onSelectTitle.bind(this)} style={clubStyle.header}>
                    { title }
                </h2>
                <span className="detail">Federación: {this.props.currentClub.federacion}</span><br />
                <span className="detail">Director Técnico: {this.props.currentClub.dtecnico}</span><br />
                <span className="detail">Email: {this.props.currentClub.email}</span><br />
                <span className="detail">Domicilio: {this.props.currentClub.domicilio}</span><br />                
            </div>      
        )
    }
}

export default Club