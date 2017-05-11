var firebase = require('firebase')

module.exports = {
    auth: function(provider) {        
        firebase.auth().signInWithPopup(provider)
        .then(result => { 
            // The firebase.User instance:
            var user = result.user;
            // The Facebook firebase.auth.AuthCredential containing the Facebook
            // access token:
            var credential = result.credential;
            console.log(`${user.providerData.email} ha iniciado sesión`)
            //let credential = provider.credential(result.user.getAuthResponse().id_token)      
        })
        .catch(error => {
              // The provider's account email, can be used in case of
            // auth/account-exists-with-different-credential to fetch the providers
            // linked to the email:
            var email = error.email;
            // The provider's credential:
            var credential = error.credential;
            // In case of auth/account-exists-with-different-credential error,
            // you can fetch the providers using this:
            if (error.code === 'auth/account-exists-with-different-credential') {
                auth.fetchProvidersForEmail(email).then(function(providers) {
                    console.log(providers)
                // The returned 'providers' is a list of the available providers
                // linked to the email address. Please refer to the guide for a more
                // complete explanation on how to recover from this error.
                });
            }
            console.log(`Error ${error.code}: ${error.message}`)

            
        });   
    },
}