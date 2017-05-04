import React, { Component } from 'react'

class CreatePost extends Component {
    constructor(){
        super()
        this.state = {
            post: {

            }
        }
    }

    updatePost(event){
        let updated = Object.assign({}, this.state.post)
        updated[event.target.id] = event.target.value
        this.setState({
            post: updated
        })
    }

    submitPost(event){
        this.props.onCreate(this.state.post)
    }

    render(){
        return (
            <div>
                <input id="title" onChange={this.updatePost.bind(this)} className="form-control" type="text" placeholder="Titulo"/>            
                <input id="name" onChange={this.updatePost.bind(this)} className="form-control" type="text" placeholder="Name"/>                      
                <button onClick={this.submitPost.bind(this)} className="btn btn-danger">Add Zone</button>
                
            </div>
        )
    }
}

export default CreatePost