import React, { Component } from 'react'
import firebase from 'firebase'
import Atletas from '../containers/Atletas'

class CreateClub extends Component {
    constructor(props){
        super(props)
        this.state = {
            club: {}, codigo: null, 
            upload1: 0, upload2: 0,            
            user: [],
            formFilled: false, docsFilled: 0, fullFilled: false, 
            activado: props.activado,
            updateForm: ''
        }

        this.handleUpload = this.handleUpload.bind(this)
        this.renderFormulario = this.renderFormulario.bind(this)
    }    

    componentWillMount(){
        //console.log('Componente CreateClub Will Mount: \n', !this.state.user)
        if (!this.state.user){
            let { user } = this.props
            this.setState({ user })
        }
        //console.log('El componente CreateClub recibe estas props: ', this.props)
        //console.log('Extraigo el email de estas props: ', this.props.user.email)
    }

    shouldComponentUpdate(nextProps, nextState){
        if (!this.state.fullFilled) {
            return true
        } else {
            return false
        }
    }
    componentWillUpdate(nextProps, nextState) {
    }
    componentDidUpdate(prevProps, prevState) {
        if ((this.state.docsFilled == 2) && (this.state.formFilled)) {
            this.setState({ fullFilled: true })
        }
    } 

    updateForm(event) {
        //console.log('Actualizando formulario', '\nCodigo: ', this.state.codigo, '\nDocumentos subidos: ', this.state.docsFilled, '\n¿Está completo el formulario?: ', this.state.formFilled)
        let codigo = this.state.codigo,
        updated = Object.assign({}, this.state.club),
        docsFilled = this.state.docsFilled 

        if (codigo == null) {
            codigo = Math.floor((Math.random() * 1000) + 1000)
        } else { return }
                   
        updated[event.target.id] = event.target.value
        updated['codigo'] = codigo
        updated['email'] = this.props.user.providerData[0].email
        //console.log(updated)   
        
        
        if ((this.myclub.value !== "") && (this.mydomicilio.value !== '') && (this.mydtecnico.value !== '') && (this.myfederacion.value !== '')) {
            this.setState({ formFilled: true, club: updated, docsFilled })
        } else { this.setState({formFilled:false, club: updated, docsFilled })} 
    
    }

    submitForm(event) {
        //console.log('Pulsado boton')
        if (!this.state.fullFilled) { return } 
        console.log('Enviando Formulario')
        event.preventDefault()

        let r = confirm(`¿Son correctos los datos?  \n
            Nombre del Club: ${this.myclub.value} \n
            Domicilio: ${this.mydomicilio.value} \n
            Director Técnico: ${this.mydtecnico.value} \n
            Federación: ${this.myfederacion.value} \n
        `)
        if (r == true) {
            this.props.onCreate(this.state.club)
            this.setState({fullFilled:false})
        } else {
            alert('Formulario incompleto, por favor, revísalo de nuevo.')
        }             

    }

    handleUpload(event){
        let name = event.target.name //=== 'upload1' ? 'upload1' : 'upload2'
        //console.log(name)
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/upload1umentos/${this.state.codigo}/${file.name}`)
        const task = storageRef.put(file)

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (name == 'upload1'){ this.setState({ upload1:percentage })}
            if (name == 'upload2'){ this.setState({ upload2:percentage })}
            
        }, error => { 
            console.log(error.message) 
        }, () => {
            let docsFilled = this.state.docsFilled
            //console.log(name)
            if(name == 'upload1') {
                if (docsFilled == 1) {
                    this.setState({ docsFilled: 2, upload1: 100, file1: task.snapshot.downloadURL })
                } else if (docsFilled == 0) {
                    this.setState({ docsFilled: 1, upload1: 100, file1: task.snapshot.downloadURL })
                }
            } else if (name == 'upload2') {
                if (docsFilled == 1) {
                    this.setState({ docsFilled: 2, upload2: 100, file2: task.snapshot.downloadURL })
                } else if (docsFilled == 0) {
                    this.setState({ docsFilled: 1, upload1: 100, file2: task.snapshot.downloadURL })
                }
            } else {
                alert('Parece que el archivo ha sido cargado correctamebte pero aún faltan campos del formulario que debes completar, y por último pulsa sobre "Añadir club". \n¡Estás a un paso de completar el resgistro.!')
                return
            }            
        });
    }

    renderFormulario(){
        //console.log(!this.state.fullFilled)
  
            //console.log(this.state.formFilled)
            return (
                <div className="ed-container">
                    <div className="ed-item l-50 no-padding">
                        <div className="w3-card-4 w3-light-grey w3-text-blue w3-padding">
                            <h3>Datos del club:</h3>                
                            <div className="w3-row w3-section">
                                <div className="w3-col" ><i className="w3-large icon-user"></i></div>
                                <input className="w3-input w3-animate-input input-text" id="club" ref={ (myclub) => this.myclub = myclub} onChange={this.updateForm.bind(this)} type="text" placeholder="Nombre del Club" />
                            </div>            
                            <div className="w3-row w3-section">
                                <div className="w3-col" ><i className="w3-large icon-user"></i></div>
                                <input className="w3-input w3-animate-input input-text" id="dtecnico" ref={ (mydtecnico) => this.mydtecnico = mydtecnico} onChange={this.updateForm.bind(this)} type="text" placeholder="Director Técnico" />
                            </div>                       
                            <div className="w3-row w3-section">
                                <div className="w3-col" ><i className="w3-large icon-user"></i></div>
                                <input className="w3-input w3-animate-input input-text" id="domicilio" ref={ (mydomicilio) => this.mydomicilio = mydomicilio} onChange={this.updateForm.bind(this)} type="text" placeholder="Domicilio" />
                            </div>                       
                            <div className="w3-row w3-section">
                                <div className="w3-col" ><i className="w3-large icon-user"></i></div>
                                <input className="w3-input w3-animate-input input-text" id="federacion" ref={ (myfederacion) => this.myfederacion = myfederacion} onChange={this.updateForm.bind(this)} type="text" placeholder="Federación" />
                            </div> 
                            <div className="main-end">                            
                            <button ref={ (mybutton) => this.mybutton = mybutton } onClick={this.submitForm.bind(this)} className="w3-btn w3-circle w3-blue icon-plus"></button> 
                            </div>
                        </div>
                    </div>
                    <div className="ed-item l-50 no-padding">
                        <div className="w3-panel w3-blue w3-card-4">
                            <h3 className="">Envío de documentos</h3><hr />
                            {this.state.upload1 > 0 && this.state.upload1 <100 ? 
                                <div className="w3-panel w3-green w3-card-4">
                                    <p className="icon-cog-alt">Información de transferencia de archivo</p>
                                    <code>Enviando...<progress value={this.state.upload1} max="100"></progress>
                                    </code>
                                </div> 
                            : ''}
                            {this.state.upload2 > 0 && this.state.upload2 <100 ? 
                                <div className="w3-panel w3-green w3-card-4">
                                    <h3 className="icon-cog-alt">Información de transferencia de archivo</h3>
                                    <p>Enviando documento...<progress value={this.state.upload2} max="100"></progress>
                                    </p>
                                </div> 
                            : ''}
                            <div className="icon-up-open-big">Declaración de responsabilidad (firmada): {this.state.upload1 == 100 ? <span className="icon-ok"></span> : ''} 
                            {this.state.upload1 === 0 ? <input className="input-file" name="upload1" onChange={this.handleUpload.bind(this)} type="file" /> : ''}</div>

                            <div className="icon-up-open-big">Justificante de pago: {this.state.upload2 == 100 ? <span className="icon-ok"></span> : ''}                       
                            {this.state.upload2 === 0 ? <input className="input-file" name="upload2" onChange={this.handleUpload.bind(this)} type="file" /> : ''}</div><br />

                        </div>
                    </div>
                </div>
            ) 
    }
    render(){
        //console.log('State en render: ', this.state.user)

        return (         
            <div>   
                {this.renderFormulario()}                        
            </div>
        )
    }
}





export default CreateClub

