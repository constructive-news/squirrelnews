import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

interface Article {
  position: number;
  id: string;
  title: string;
  teaser: string;
  source: string;
  url: string;
  date: Date;
  published: boolean;
  imageUrl: string;
  language: string;
  category?: string;
  issue: string;
  issueWeek: number;
  credit: string;
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

const checkToken = async (token: any ): Promise<boolean> => {
  const queryToken = await admin.firestore().collection('access-tokens').doc('sheet').get();
  return queryToken.get('token') === token ? true : false;
}


export const createNewIssue = functions.https.onRequest(async (request, response) => {

  const tokenAccepted = await checkToken(request.headers['token']);
  if ( request.method === 'POST' && tokenAccepted) {

    if ( request.body.title === undefined || request.body.title === null) {
      response.send(400).send('Required fields are not valid please check your request');
    } else if (request.body.language === undefined || request.body.language === null) {
      response.send(400).send('Required fields are not valid please check your request');
    } else {
      // insert new issue

      const ds = request.body.title.split(".");

      const element = {
        title: request.body.title,
        headline: request.body.headline || null,
        teaser: request.body.teaser || null,
        language: request.body.language,
        dateCreated: new Date(),
        publishedAt: new Date(`${ds[1]}/${parseInt(ds[0])+1}/${ds[2]}`)
      }

      const result = await admin.firestore().collection('issues').add(element);
      response.status(200).json({
        message: `success`,
        inserted: result.id
      });
    }

  } else {
    response.status(400).send('Bad Request')
  }
});

export const getArticle = functions.https.onRequest( async (request, response) => {
  const tokenAccepted = await checkToken(request.headers['token']);
  if ( request.method === 'GET' && tokenAccepted) {
    
    // console.log(collections);
  }
});

export const addArticleToIssue = functions.https.onRequest(async (request, response) => {
  const tokenAccepted = await checkToken(request.headers['token']);
  if (request.method === 'PATCH' && tokenAccepted ) {

    const element = {
      position: request.body.position,
      title: request.body.title,
      teaser: request.body.teaser,
      source: request.body.source,
      url: request.body.url,
      imageUrl: request.body.imageUrl,
      credit: request.body.credit,
      dateCreated: new Date(),
      language: request.body.language,
      published: request.body.published
    };

    const result = await admin.firestore().collection('issues').doc(request.body.issue).collection('articles').add(element);

    if(result.id) {
      response.status(200).json({
        message: `success`,
        inserted: result.id
      });
    } else {
      response.status(418).json({
        message: 'error, something wrong happened',
      })
    }


  } else {
    response.status(400).send('Bad Request');
  }
});


export const publishArticle = functions.https.onRequest( async (request, response) => {

  const tokenAccepted = checkToken(request.headers.token);

  if (request.method === 'PATCH' && tokenAccepted) {
    const query = await admin.firestore()
                                  .collection('issues').doc(`${request.body.issueId}/articles/${request.body.articleId}`).get();
                                    // .collection('articles').where(admin.firestore.FieldPath.documentId(), '==', request.body.articleId).get();

    const article = query.data();
    
    if (article) {
      article.published = request.body.action === 'publish' ? true : false;

      await admin.firestore().doc(`issues/${request.body.issueId}/articles/${request.body.articleId}`).set(article);


      response.status(200).json({
        message: `success`,
        inserted: request.body.articleId
      });

    } else {
      response.status(404).json({
        message: `not found`,
        reason: 'requested article was not found'
      });
    }
  } else {
    response.status(400).send('Bad Request');
  }
});


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

          element.issueWeek = ISO8601_week_no(new Date())

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
        console.log('dryrun')
          const current = await (await admin.firestore().doc(`news/${requestBody.id}`).get()).data();
          console.log(current);
          if (current !== undefined) {
            current.published = requestBody.action === 'publish' ? true : false;
            
            response.status(200).json({
              message: "dryrun PATCH",
            });
          } else {
            response.status(400).json({
              message: "did not work"
            })
          }
      } else if (requestBody.id === undefined) {
        response.status(400).send();

      } else {

        const current = await (await admin.firestore().doc(`news/${requestBody.id}`).get()).data();
        if (current !== undefined) {
          current.published = requestBody.action === 'publish' ? true : false;
          
          await admin.firestore().doc(`news/${requestBody.id}`).set(current);

          response.status(200).json({
            message: "updated",
          });
        } else {
          response.status(400).json({
            message: "did not work"
          })
        }
      }
    } else {

      response.status(400);
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

