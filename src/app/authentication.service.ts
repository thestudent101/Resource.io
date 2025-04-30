import { Injectable } from '@angular/core';

import { AuthenticationDetails, CognitoUser,CognitoUserAttribute,CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

const poolData = {
    UserPoolId: 'eu-west-1_q8lythCqB', // Your user pool id here
    ClientId: 'Your Client Id' // Your client id here  
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    cognitoUser: any;

    constructor() { }

  // registration
  register(email: string, password: string) {

    const attributeList: CognitoUserAttribute[] = [];

    return Observable.create((observer:any) => {
      userPool.signUp(email, password, attributeList, [], (err, result:any) => {
        if (err) {
          console.log("signUp error", err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log("signUp success", result);
        observer.next(result);
        observer.complete();
      });
    });

  }

  // confirmation code
  confirmAuthCode(code:string) {
    const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };
    return Observable.create((observer:any) => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  // sign in
  signIn(email:string, password:string) { 

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    
    return Observable.create((observer:any) => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          
          //console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

  isLoggedIn() {    
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser(): CognitoUser {
    // gets the current user from the local storage
    return userPool.getCurrentUser() as CognitoUser;
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }
}
