import React, { Component } from 'react'
import firebase from 'firebase'
import CreateAtleta from './CreateAtleta'

class CreateClub extends Component {
    constructor(){
        super()
        this.state = {
            club: {},
            codigo: this.props.codigo,
            uploadValue: 0,
            doc: null,
            user: null,
            paso: 0,
            clubRegistrado: false
        }

        this.handleUpload = this.handleUpload.bind(this)
        this.gestionarFormulario = this.gestionarFormulario.bind(this)
    }
    
    componentWillMount(){        
        firebase.auth().onAuthStateChanged(user => {            
            this.setState({ user, paso: 1 })            
        })
    }

    updateClub(event){
        console.log('updateClub: ', event.target.id, ' == ', event.target.value)
        let codigo = Math.floor((Math.random() * 1000) + 1000)
        let updated = Object.assign({}, this.state.club) 
        updated['codigo'] = codigo 
        updated[event.target.id] = event.target.value
        this.setState({
            club: updated,
            codigo
        })   
    }

    submitClub(event){
        event.preventDefault();
        let validar = 0
        this.state.club.club !== '' ? validar++ : validar = 0
        this.state.club.domicilio !== '' ? validar++ : validar = 0
        this.state.club.email !== '' ? validar++ : validar = 0
        this.state.club.dtecnico !== '' ? validar++ : validar = 0
        this.state.club.emailtecnico !== '' ? validar++ : validar = 0
        this.state.club.federacion !== '' ? validar++ : validar = 0
        if (validar === 6) {
            validar = 0
            this.setState({ paso: this.state.paso + 1 })
        }
        if (this.state.paso === 3) {            
            this.props.onCreate(this.state.club)
            this.setState({paso:0})
        } else {
            alert('Formulario incompleto, por favor, revísalo de nuevo.')
        }        
    }

    handleUpload(event){
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/documentos/${this.state.codigo}/${file.name}`)
        const task = storageRef.put(file)

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => { 
            console.log(error.message) 
        }, () => {
            if(this.state.paso < 3) {
                this.setState({
                    paso: this.state.paso + 1,
                    uploadValue: 100,
                    doc: task.snapshot.downloadURL
                });
            } else {
                if (this.state.paso === 0){
                    alert('Parece que el archivo ha sido cargado correctamebte pero aún faltan campos del formulario que debes completar, y por último pulsa sobre "Añadir club". \n¡Estás a un paso de completar el resgistro.!')
                    return
                }
            }            
        });
    }

    gestionarFormulario(codigo){
        if(codigo === null || this.state.user === null) {
            return (
                <div>
                    <input id="club" onChange={this.updateClub.bind(this)} className="form-control" type="text" placeholder="Nombre del Club" />            
                    <input id="domicilio" onChange={this.updateClub.bind(this)} className="form-control" type="text" placeholder="Domicilio" /><br />                      
                    <input id="email" onChange={this.updateClub.bind(this)} className="form-control" type="email" placeholder="Correo Electrónico" />                      
                    <input id="dtecnico" onChange={this.updateClub.bind(this)} className="form-control" type="text" placeholder="Director Técnico" /><br />                      
                    <input id="emailtecnico" onChange={this.updateClub.bind(this)} className="form-control" type="email" placeholder="Correo-e Dtor.Técnico" />                      
                    <input id="federacion" onChange={this.updateClub.bind(this)} className="form-control" type="text" placeholder="Federación" />                                    
                    <button onClick={this.submitClub.bind(this)} className="btn btn-danger">Añadir Club</button>                
                    <p>Bases del Torneo</p>
                    <progress value={this.state.uploadValue} max="100"></progress>
                    <input onChange={this.handleUpload.bind(this)} type="file" />
                </div>
            )
        } else  {
            return (
                <div>
                    <CreateAtleta  codigo={this.state.codigo}/>
               </div>
            )
        }
    }
    render(){
        console.log(this.state)
        return (         
            <div>   
                {this.gestionarFormulario(this.state.codigo)}                        
            </div>
        )
    }
}

export default CreateClub

