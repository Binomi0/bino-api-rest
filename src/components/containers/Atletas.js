import React, { Component } from 'react'
import { CreateAtleta, Atleta, Club } from '../presentation'
import { APIManager } from '../../utils'

class Atletas extends Component {
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

    addAtleta(atleta){
        let updatedAtleta = Object.assign({}, atleta)

        APIManager.post('/api/atleta', updatedAtleta, (err, response) => {
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

    selectAtleta(index){
        this.setState({
            selected: index
        })
    }

    render() {
        const listItems = this.state.list.map((atleta , i) => {
            let selected = (i==this.state.selected)
            return (
                <li key={i}>
                    <Atleta index={i} onSelect={this.selectAtleta.bind(this)} isSelected={selected} currentAtleta={atleta}/>
                </li> 
                )
        })        
        return (
            <div>
                <ol>
                    {listItems}
                </ol>
                <CreateAtleta onCreate={this.addAtleta.bind(this)}/>
            </div>
        )
    }
}

export default Atletas