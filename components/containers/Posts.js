import React, { Component } from 'react'
import Post from '../presentation/Post'
import superagent from 'superagent'

class Posts extends Component {
    constructor() {
        super()
        this.state = {
            posts: {
                title: '',
                name: ''            
            },
            list: []
        }

    }

    componentDidMount(){
        console.log('Componend Did Mount')

        superagent
        .get('/api/post')
        .query(null)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err){
                alert('ERROR: ', err)
                return
            }

            let results = response.body.results
            console.log(JSON.stringify(results))
            this.setState({
                list: results
            })

        })
    }

    updatePost(event){
        console.log('UpdatePost: ', event.target.id, '==', event.target.value)
        let updatedPost = Object.assign({}, this.state.post)
        updatedPost[event.target.id] = event.target.value
        this.setState({
            post: updatedPost
        })
    }

    addPost(){
        console.log('SubmitComment: ', JSON.stringify(this.state.post))
        let updatedPost = Object.assign([], this.state.list)
        updatedPost.push(this.state.post)
        this.setState({
            list: updatedPost
        })
    }

    render() {

        const listItems = this.state.list.map((post , i) => {
            return (
                <li key={i}><Post currentPost={post}/></li> 
                )
        })
        
        return (
            <div>
                <ol>
                    {listItems}
                </ol>
                <input id="title" onChange={this.updatePost.bind(this)} className="form-control" type="text" placeholder="Titulo"/>            
                <input id="name" onChange={this.updatePost.bind(this)} className="form-control" type="text" placeholder="Name"/>           
           
                <button onClick={this.addPost.bind(this)} className="btn btn-danger">Add Zone</button>
            </div>

        )
    }
}

export default Posts