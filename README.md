# squirrelnews
Squirrel News App ulti-project repository contains all custom source code to use in the application. 

## Frontend

The Frontend is an Angular Application utilyzing the ionic framework. 

### Auth Credentials 

The App uses Firebase as the backend and the credentials should not be exposed directly via source control. Instead the angular environments are using the following conventions:

1. create a new file *environment.firebase.ts* in 

    src/environtments

and export the firebase configuration from the firebase console in your new file. Dont forget to export that configuration. The typical angular env typescript file will include it and exposing that to the rest of the application.


### building  and deplying for preview

Use 

    ionic build --configuration=preview

assuming you are in ng-app subfolder: rm all from firebase hosting nd copy new stuff there

    rm -rf ./firebase/public/* 
    cp www/* ../firebase/public
    firebase deploy --only hosting


### Angular Fire 

The Frontend uses Angular Fire and is configured in Firebase as a Webapp as we are developing a hybrid solution that is as x-platform as possible. 

## Firebase 

We are using Firebase as our Application Cloud Backend. So far we are using 

* Firestore to persist curated articles
* Functions to provide an API for third-party-apps to publish curations

### Runtime Environment for Functions

To access firestore in the function environemnt, we configured

    "service_acc": {
      "clientemail" :string
      "projectid": string
      "key": string (the private key)
    }


#### Info Local Development

To run the application locally, run

    npm run serve 

If your runtime conf or environment is empty, think about the following:

Firebase stores its enviroment on localhost in a .runtimeconfig.json which should not be versioned in git for safety and security reasons. Instead, if you want to start developing you will need to ask an admin for a private key to access firestore from the function or if you are the admin, generate a new private key using the firebase console and store them in the respective file. 

For more information visit: https://firebase.google.com/docs/functions/config-env

## Help Wanted and Pull Requests are welcome 

We have many ideas and plans for the app. If you want to join this project feel free to drop me a line on Twitter: [@olierxleben](https://twitter.com/olierxleben). We are a small team of volunteers and an even smaller team of developers who try to bring joy to the readers of digital newspapers. We also encourage this project for new OSS developers. If you want to help for Android, iOS, Web or Backend with Firebase we would like to hear from you. :)