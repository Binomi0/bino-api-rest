import React, { Component } from 'react'
import Posts from '../containers/Posts'
import Comments from '../containers/Comments'
import Clubs from '../containers/Clubs'
import Atletas from '../containers/Atletas'

class Home extends Component {

    render() {
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Clubs />
                    </div>
                    <div className="col-md-8">
                        <Atletas />
                    </div>
                </div>
             
            </div>      
        )
    }
}

export default Home