import React, { Component } from 'react'
import {CreatePost, Post } from '../presentation'
import { APIManager } from '../../utils'

class Posts extends Component {
    constructor() {
        super()
        this.state = {
            selected: 0,
            list: []
        }
    }

    componentDidMount(){
        APIManager.get('/api/post', null, (err, response) => {
            if (err){
                alert('ERROR: ', err.message)
                return
            }
            this.setState({
                list: response.results
            })
        }) 
    }

    addPost(post){
        let updatedPost = Object.assign({}, post)

        APIManager.post('/api/post', updatedPost, (err, response) => {
            if(err){
                alert('ERROR: ', err.message)
                return
            }

            console.log('POST CREATED: ', JSON.stringify(response))
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.result)
            this.setState({
                list: updatedList
            })
        })
    }

    selectPost(index){
        this.setState({
            selected: index
        })
    }

    render() {
        const listItems = this.state.list.map((post , i) => {
            let selected = (i==this.state.selected)
            return (
                <li key={i}>
                    <Post index={i} onSelect={this.selectPost.bind(this)} isSelected={selected} currentPost={post}/>
                </li> 
                )
        })        
        return (
            <div>
                <ol>
                    {listItems}
                </ol>
                <CreatePost onCreate={this.addPost.bind(this)}/>
            </div>
        )
    }
}

export default Posts