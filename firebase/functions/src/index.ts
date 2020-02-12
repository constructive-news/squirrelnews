import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

interface Article {
  id: string;
  title: string;
  teaser: string;
  source: string;
  url: string;
  imageURL: string;
  credit: string;
  origin: string;
  originTitle: string;
  originTeaser: string;
  originUrl: string;
  imageSource: string;
  category?: string;
  issue: number;
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

function ISO8601_week_no(dt: Date) {
  const tdt = new Date(dt.valueOf());
  const dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - tdt.getTime()) / 604800000);
}

/**
 * used to store a specific publication into firebase store from a specific client 
 */
export const publishCurations = functions.https.onRequest(async (request, response) => {

  // create new curation
  if (request.method === 'POST') {
    const tokenQuery = await admin.firestore().collection('access-tokens').doc('sheet').get()

    if (tokenQuery.get('token') === request.headers['token']) {
      const requestBody = request.body;

      if (requestBody.dry !== undefined && requestBody.dry) {
        response.status(200).json({
          message: "dryrun"
        });

      } else if (requestBody.articles === undefined || requestBody.articles.length === 0) {
        response.status(400).send();

      } else {
        await requestBody.articles.forEach(async (element: Article) => {

          element.issue = ISO8601_week_no(new Date())

          const result = await admin.firestore().collection('news').add(element);
          
          response.status(200).json({
            message: `success`,
            inserted: result.id
          });
        });
      }
    } else {
      response.status(401);
    }
  } else if (request.method === 'PATCH') {
    // update curations
    const tokenQuery = await admin.firestore().collection('access-tokens').doc('sheet').get()

    if (tokenQuery.get('token') === request.headers['token']) {
      const requestBody = request.body;

      if (requestBody.dry !== undefined && requestBody.dry) {
        response.status(200).json({
          message: "dryrun PATCH"
        });

      } else if (requestBody.articles === undefined || requestBody.articles.length === 0) {
        response.status(400).send();

      } else {
        requestBody.articles.forEach(async (element: Article) => {
          admin.firestore().collection('news').where('originTitle', '==', element.originTitle).get().then(
            (snapshot) => {
              console.log(snapshot.size);
            },
            (err) => { console.error('err', err) }
          )
        })
      }
    }
  } else if (request.method === 'DELETE') {
    const result = await admin.firestore().doc(`news/${request.body.id}`).delete();
    response.status(200).send(result);
  } else {
    response.status(405).json({
      message: "Method is not allowed here."
    })
  }
})

