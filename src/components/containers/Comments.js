import React, { Component } from 'react'
import { CreateComment, Comment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'

class Comments extends Component {
    constructor(){
        super()
        this.state = {
            list: []
        }        
    }

    componentDidMount(){
        APIManager.get('/api/comment', null, (err, response) => {
            if (err){
                alert('ERROR: ', err.message)
                return
            }
            this.setState({
                list: response.results
            })
        }) 
    }

    submitComment(comment){
        console.log('SubmitComment: ', JSON.stringify(comment))
        let updatedComment = Object.assign({}, comment)
        APIManager.post('/api/comment', updatedComment, (err, response) => {
            if(err){
                alert(err)
                return
            }

            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.result)
            this.setState({
                list: updatedList
            })
        })
    }

    render() {
        const commentlist = this.state.list.map((comment, i) => {
            return (
                <li key={i}><Comment currentComment={comment}/></li>
            )
        })

        return (
            <div>
                <h2>Comments: Post 1</h2>
                <div style={styles.comment.commentBox}>
                    <ul style={styles.comment.commentList}>
                        { commentlist }
                    </ul> 

                    <CreateComment onCreate={this.submitComment.bind(this)}/>
                </div>
                         
            </div>
        )
    }
}

export default Comments