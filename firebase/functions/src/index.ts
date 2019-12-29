import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

/**
 * used to 
 */
export const publishCurations = functions.https.onRequest( (request, response ) => {

  if (request.method !== 'POST') {
    response.status(405).json({
      message: "Method is not allowed here."
    })
  } else {
    response.status(200).json({
      message: "needs implementation"
    })
  }

})