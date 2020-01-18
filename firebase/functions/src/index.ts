import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

interface Article {
  name: string;
  teaser: string;
  imageURL: string;
  imageSource: string;
  category?: string;
  origin: string;
  date: string;
}


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
    const tokenQuery = await admin.firestore().collection('access-tokens').doc('sheet').get()
      
    if (tokenQuery.get('token') === request.headers['token']) {
      const requestBody = JSON.parse(request.body);

      if (requestBody.dry !== undefined && requestBody.dry) {
        response.status(200).json({
          message: "dryrun"
        });
      } else if ( requestBody.articles === undefined || requestBody.articles.length === 0) {
        response.status(400).send();
      } else {
        const dbResults: String[] = [];
        requestBody.articles.forEach( async (element: Article) => {
          const result = await admin.firestore().collection('news').add(element)
          dbResults.push(result.id);
        });
        
        response.status(200).json({
          message: `inserted ${dbResults}`
        });
      }
    } else {
      response.status(401);
    }

  }

})

