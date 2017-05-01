import React, { Component } from 'react'
import Posts from '../containers/Posts'
import Comments from '../containers/Comments'

class Home extends Component {

    render() {
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Posts />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
             
            </div>      
        )
    }
}

export default Home