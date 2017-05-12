import superagent from 'superagent'

export default {

    get: (url, params, callback) => {
        superagent
        .get(url)
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err){
                callback(err, null)
                return
            }

            const confirmation = response.body.confirmation
            if(confirmation != 'success'){
                callback({message: response.body.message}, null)
                return
            }

            callback(null, response.body)
        })
    },

    post: (url, body, callback) => {
        console.log('URL: ', url, 'BODY: ', body)
        superagent
        .post(url)
        .send(body)
        .set('Accept', 'application/json')
        .end((err, response) =>{
            if(err){
                callback(err, null)
                return
            }
            const confirmation = response.body.confirmation
            if(confirmation != 'success'){
                callback({message: response.body.message}, null)
                return
            }
            console.log('POST REQUEST: ', response.body)
            callback(null, response.body)
        })
    },    
    put: (url, body, callback) => {
        console.log('URL: ', url, 'BODY: ', body)
        superagent
        .post(url)
        .send(body)
        .set('Accept', 'application/json')
        .end((err, response) =>{
            if(err){
                callback(err, null)
                return
            }
            const confirmation = response.body.confirmation
            if(confirmation != 'success'){
                callback({message: response.body.message}, null)
                return
            }            
            console.log('PUT REQUEST: ', response.body)
            callback(null, response.body)
        })
    },

    delete: (url, id) => {
        console.log('URL: ', url, 'ID: ', id)
        superagent
        .post(url)
        .send(id)
        .set('Accept', 'application/json')
        .end(err, response  => {
            if(err) {
                callback(err, null)
                return
            }
            const confirmation = response.body.confirmation
            if (confirmation != 'success') {
                callback({message: response.body.message}, null)
                return
            }
            console.log('DELETE REQUEST: ', response.body)
            callback(null, response.body)
        })
    }
}