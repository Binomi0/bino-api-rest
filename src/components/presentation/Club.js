import React, { Component } from 'react'
import styles from './styles'

class Club extends Component {

    onSelectTitle(event){
        event.preventDefault()
        this.props.selectedIndex(this.props.index)
    }

    render() {
        const clubStyle = styles.zone;
        const title = (this.props.isSelected) ? <a style={clubStyle.club.active} href="#">{this.props.club.club}</a> : <a href="#" style={clubStyle.club.inactive}>{this.props.club.club}</a>

        return ( 
            <div style={clubStyle.container}>
                <h2 className="karate clear" onClick={this.onSelectTitle.bind(this)} style={clubStyle.header}>
                    { title }
                </h2>
             </div>      
        )
    }
}

export default Club