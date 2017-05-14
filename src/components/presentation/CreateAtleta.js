import React, { Component } from 'react'
import Spinner from '../Spinner'
import styles from './styles'

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
        updated['codigo'] = this.props.codigo
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
            <div> 
                <p>Añadir participante:</p>
                <input id="codigo"onChange={this.updateAtleta.bind(this)} type="hidden" value={this.props.codigo}/>
                <div className="w3-row">
                    <div className="w3-col" ><i className="w3-large icon-user"></i></div>
                    <input style={styles.input} id="nombre" className="w3-input w3-animate-input input-text" ref={ (mynombre) => this.mynombre = mynombre} onChange={this.updateAtleta.bind(this)} type="text" placeholder="Nombre"/><br />           
                </div>                    
                 <div className="w3-row">
                    <div className="w3-col" ><i className="w3-large icon-user"></i></div>
                    <input style={styles.input} id="edad" className="w3-input w3-animate-input input-text" ref={ (myedad) => this.myedad = myedad} onChange={this.updateAtleta.bind(this)} type="text" placeholder="Edad"/>     <br />       
                </div>
                 <div className="w3-row">
                    <div className="w3-col" ><i className="w3-large icon-user"></i>
                        <input style={styles.input} id="cinturon" className="w3-input w3-animate-input input-text" ref={ (mycinturon) => this.mycinturon = mycinturon} onChange={this.updateAtleta.bind(this)} type="text" placeholder="Cinturón"/>
                    </div>
                    
                </div>                    
                 <div className="w3-row">
                    <div className="w3-col" ><i className="w3-large icon-user"></i></div>
                    <input style={styles.input} id="discapacidad" className="w3-input w3-animate-input input-text" ref={ (mydiscapacidad) => this.mydiscapacidad = mydiscapacidad} onChange={this.updateAtleta.bind(this)} type="text" placeholder="Discapacidad"/>                      
                </div> 
                <div className="w3-row w3-section">
                    <p>Categoría</p>
                    <select className="w3-select" defaultValue="Elige una categoría" name="categoria" id="categoria" value={this.state.categoria} onChange={this.updateAtleta.bind(this)}>
                        <option defaultValue="Elige una categoría" disabled>Elige una categoría</option>
                        <option value="Alevín" name="categoria">Alevín (Entre 7 y 9 años)</option>
                        <option value="Infantil" name="categoria">Infantil (Entre 10 y 11 años)</option>
                        <option value="Juvenil" name="categoria">Juvenil (Entre 12 y 13 años)</option>
                        <option value="Cadete" name="categoria">Cadete (Entre 14 y 15 años)</option>
                        <option value="Junior" name="categoria">Junior (Entre 16 y 17 años)</option>
                        <option value="Senior" name="categoria">Senior (+18 años)</option>
                    </select>
                </div> 
                <div className="w3-row w3-section ">
                    <p>Sexo</p>
                    <p><input type="radio" name="sexo" value="masculino" /> Masculino | <input type="radio" name="sexo" value="femenino" /> Femenino</p>   
                </div>   
                <button ref={ (mybutton) => this.mybutton = mybutton } onClick={this.submitAtleta.bind(this)} className="w3-btn w3-blue">Añadir nuevo participante</button>                    
            </div>
        )
    }
}

export default CreateAtleta

