import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const apikey: admin.ServiceAccount = {
  projectId: functions.config().service_acc.projectid,
  clientEmail: functions.config().service_acc.clientemail,
  privateKey: functions.config().service_acc.key
}

admin.initializeApp({
  credential: admin.credential.cert(apikey),
  databaseURL: "https://squirrel-news-789fd.firebaseio.com"
});


/**
 * used to store a specific publication into firebase store from a specific client 
 */
export const publishCurations = functions.https.onRequest( async (request, response ) => {
  
  if (request.method !== 'POST') {
    response.status(405).json({
      message: "Method is not allowed here."
    })
  } else {
    const query = await admin.firestore().collection('access-tokens').doc('sheet').get()
      
    if (query.get('token') === request.headers['token']) {
      // TODO: parse request body and insert into firestore 
      response.status(200).json({
        "message": "swaggy"
      });
    } else {
      response.status(400).json({
        "message": "bad request"
      });
    }

  }

})