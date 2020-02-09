import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

interface Article {
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

  if (request.method !== 'POST') {
    response.status(405).json({
      message: "Method is not allowed here."
    })
  } else {
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
        const dbResults: String[] = [];
        requestBody.articles.forEach(async (element: Article) => {
          
          element.issue = ISO8601_week_no(new Date())

          const result = await admin.firestore().collection('news').add(element)
          dbResults.push(result.id);
        });

        response.status(200).json({
          message: `success`
        });
      }
    } else {
      response.status(401);
    }

  }

})

