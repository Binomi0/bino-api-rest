import React, { Component } from 'react'
import { CreateClub, Club } from '../presentation'
import { APIManager } from '../../utils'

class Clubs extends Component {
    constructor() {
        super()
        this.state = {
            selected: 0,
            list: []
        }
    }

    componentDidMount(){
        APIManager.get('/api/club', null, (err, response) => {
            if (err){
                alert('ERROR: ', err.message)
                return
            }
            this.setState({
                list: response.results
            })
        }) 
    }

    addClub(club){
        let updatedClub = Object.assign({}, club)

        APIManager.post('/api/club', updatedClub, (err, response) => {
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

    selectClub(index){
        this.setState({
            selected: index
        })
    }

    render() {
        const listItems = this.state.list.map((club , i) => {
            let selected = (i==this.state.selected)
            return (
                <li key={i}>
                    <Club index={i} onSelect={this.selectClub.bind(this)} isSelected={selected} currentClub={club}/>
                </li> 
                )
        })        
        return (
            <div>
                <ol>
                    {listItems}
                </ol>
                <CreateClub onCreate={this.addClub.bind(this)}/>
            </div>
        )
    }
}

export default Clubs