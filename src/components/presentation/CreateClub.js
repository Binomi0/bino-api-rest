import React, { Component } from 'react'

class CreateClub extends Component {
    constructor(){
        super()
        this.state = {
            club: {

            }
        }
    }

    updateClub(event){
        let updated = Object.assign({}, this.state.club)
        updated[event.target.id] = event.target.value
        this.setState({
            club: updated
        })
    }

    submitClub(event){
        this.props.onCreate(this.state.club)
    }

    render(){
        return (
            <div>
                <input id="club" onChange={this.updateClub.bind(this)} className="form-control" type="text" placeholder="Club" required/>            
                <input id="domicilio" onChange={this.updateClub.bind(this)} className="form-control" type="text" placeholder="Domicilio" required/>                      
                <input id="email" onChange={this.updateClub.bind(this)} className="form-control" type="email" placeholder="Correo Electrónico" required/>                      
                <input id="dtecnico" onChange={this.updateClub.bind(this)} className="form-control" type="text" placeholder="Director Técnico" required/>                      
                <input id="emailtecnico" onChange={this.updateClub.bind(this)} className="form-control" type="email" placeholder="Correo-e Dtor.Técnico" required/>                      
                <input id="federacion" onChange={this.updateClub.bind(this)} className="form-control" type="text" placeholder="Federación" required/>                      
                <button onClick={this.submitClub.bind(this)} className="btn btn-danger">Añadir Club</button>                
            </div>
        )
    }
}

export default CreateClub

