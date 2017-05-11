import React, { Component } from 'react'
import Spinner from '../Spinner'

class CreateAtleta extends Component {
    constructor(props){
        super(props)
        this.state = {
            codigo: props.codigo,
            atleta: {},
            anadido: 0,
            formFilled: false,
            loading: true
        }

        this.updateAtleta = this.updateAtleta.bind(this)
        this.submitAtleta = this.submitAtleta.bind(this)
    }

    componentWillMount(){console.log('Will Mount')}
    componentDidMount(){
        //console.log('Did Mount')
        this.setState({loading:false})
    }

    updateAtleta(event) {
        //console.log(this.state.formFilled)
        //console.log(this.mynombre.value !== '')
        let validar = 0
        this.mynombre.value !== '' ? validar = validar + 1 : validar = 0
        this.myedad.value !== '' ? validar = validar + 1 : validar = 0
        this.mycinturon.value !== '' ? validar = validar + 1 : validar = 0
        this.mydiscapacidad.value !== '' ? validar = validar + 1 : validar = 0
        //console.log(validar)
        let updated = Object.assign({}, this.state.atleta) 
        updated[event.target.id] = event.target.value        

        if (validar == 4) { 
            //console.log(this.mybutton, this.mybutton.disabled, this.state)            
            this.setState({
                formFilled: true,
                atleta: updated
            })
        } else { 
            this.setState({ formFilled:false, atleta: updated })
        }        
    }

    submitAtleta(event){
        //console.log(JSON.stringify(this.state.atleta))
         if (!this.state.formFilled) { return } else {
            this.props.onCreate(this.state.atleta, this.state.codigo)
            this.mynombre.value = '' 
            this.myedad.value = '' 
            this.mycinturon.value = ''
            this.mydiscapacidad.value = ''
            this.setState({formFilled:false})
        }
    }

    render(){
        if (this.state.loading) { return <Spinner /> }
        return (
            <div className="w3-container w3-padding">
                <div className="w3-card-4 w3-light-grey w3-text-blue w3-padding">
                    <p>Código del equipo: {this.props.codigo}</p>
                    <div className="w3-container"> 
                        <div>
                            <input id="codigo" className="w3-input" onChange={this.updateAtleta.bind(this)} className="form-control" type="hidden" value={this.props.codigo}/>
                        </div>
                    </div>
                    <div className="w3-container">
                        <div>
                            <input id="nombre" className="w3-input" ref={ (mynombre) => this.mynombre = mynombre} onChange={this.updateAtleta.bind(this)} className="form-control" type="text" placeholder="Nombre"/><br />           
                        </div>
                    </div>
                    <div className="w3-container">
                        <div>
                            <input id="edad" className="w3-input" ref={ (myedad) => this.myedad = myedad} onChange={this.updateAtleta.bind(this)} className="form-control" type="text" placeholder="Edad"/>     <br />       
                        </div>
                    </div>
                    <div className="w3-container">
                        <div>
                            <input id="cinturon" className="w3-input" ref={ (mycinturon) => this.mycinturon = mycinturon} onChange={this.updateAtleta.bind(this)} className="form-control" type="text" placeholder="Cinturón"/> <br />           
                        </div>
                    </div>
                    <div className="w3-container">
                        <div>
                            <input id="discapacidad" className="w3-input" ref={ (mydiscapacidad) => this.mydiscapacidad = mydiscapacidad} onChange={this.updateAtleta.bind(this)} className="form-control" type="text" placeholder="Discapacidad"/>                      
                        </div>
                    </div>
                    <button ref={ (mybutton) => this.mybutton = mybutton } onClick={this.submitAtleta.bind(this)} className="w3-btn w3-blue">Añadir nuevo participante</button>
                    
                </div>
            </div>
        )
    }
}

export default CreateAtleta

