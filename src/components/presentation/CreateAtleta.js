import React, { Component } from 'react'

class CreateAtleta extends Component {
    constructor(){
        super()
        this.state = {
            atleta: {

            }
        }

        this.updateAtleta = this.updateAtleta.bind(this)
        this.submitAtleta = this.submitAtleta.bind(this)
    }

    updateAtleta(event){
        let updated = Object.assign({}, this.state.atleta)
        updated[event.target.id] = event.target.value
        this.setState({
            atleta: updated
        })
    }

    submitAtleta(event){
        this.props.onCreate(this.state.atleta)
    }

    render(){
        return (
            <div>
                <p>Código del equipo: {this.props.codigo}</p>
                <input id="title" onChange={this.updateAtleta.bind(this)} className="form-control" type="text" placeholder="Titulo"/>            
                <input id="title" onChange={this.updateAtleta.bind(this)} className="form-control" type="text" placeholder="Titulo"/>            
                <input id="title" onChange={this.updateAtleta.bind(this)} className="form-control" type="text" placeholder="Titulo"/>            
                <input id="name" onChange={this.updateAtleta.bind(this)} className="form-control" type="text" placeholder="Name"/>                      
                <button onClick={this.submitAtleta.bind(this)} className="btn btn-danger">Add Zone</button>
                
            </div>
        )
    }
}

export default CreateAtleta

