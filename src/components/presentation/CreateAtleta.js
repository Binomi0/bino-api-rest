import React, { Component } from 'react'

class CreateAtleta extends Component {
    constructor(){
        super()
        this.state = {
            atleta: {

            }
        }
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

