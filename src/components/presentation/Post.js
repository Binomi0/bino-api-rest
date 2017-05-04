import React, { Component } from 'react'
import styles from './styles'

class Post extends Component {

    onSelectTitle(event){
        event.preventDefault()
        this.props.onSelect(this.props.index)
    }

    render() {
        const postStyle = styles.zone;
        const title = (this.props.isSelected) ? <a style={postStyle.title} href="#">{this.props.currentPost.title}</a> : <a href="#">{this.props.currentPost.title}</a>

        return ( 
            <div style={postStyle.container}>
                <h2 onClick={this.onSelectTitle.bind(this)} style={postStyle.header}>
                    { title }
                </h2>
                <span className="detail">{this.props.currentPost.name}</span><br />
                <span className="detail">{this.props.currentPost.numComments} comments</span>
            </div>      
        )
    }
}

export default Post