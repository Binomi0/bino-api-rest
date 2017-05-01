import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'

class Comments extends Component {
    constructor(){
        super()
        this.state = {
            comment: {
                username: '',
                body: '',
                timestamp: ''
            },
            list: []
        }        
    }

    updateUsername(event){
        const updatingInfo = Object.assign({}, this.state.comment)
        updatingInfo['username'] = event.target.value
        this.setState({ comment: updatingInfo })
    }

    updateBody(event){
        const updatingInfo = Object.assign({}, this.state.comment)
        updatingInfo['body'] =  event.target.value
        this.setState({ comment: updatingInfo })
    }
    updateTimestamp(event){
        const updatingInfo = Object.assign({}, this.state.comment)
        updatingInfo['timestamp'] =  event.target.value
        this.setState({ comment: updatingInfo })
    }

    submitComment(){
        console.log('SubmitComment: ', JSON.stringify(this.state.comment))
        const updatingInfo = Object.assign([], this.state.list)
        updatingInfo.push(this.state.comment)
        this.setState({
            list: updatingInfo
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

                    <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username"/><br />
                    <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment"/><br />
                    <input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="TimeStamp"/><br />
                    <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
                </div>
                         
            </div>
        )
    }
}

export default Comments