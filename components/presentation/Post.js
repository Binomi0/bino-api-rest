import React, { Component } from 'react'
import styles from './styles'

class Post extends Component {

    render() {
        const postStyle = styles.zone;
        return ( 
            <div style={postStyle.container}>
                <h2 style={postStyle.header}><a  style={postStyle.title}href="#">{this.props.currentPost.title}</a></h2>
                <span className="detail">{this.props.currentPost.name}</span><br />
                <span className="detail">{this.props.currentPost.numComments} comments</span>
            </div>      
        )
    }
}

export default Post