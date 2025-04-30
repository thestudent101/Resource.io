import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AuthenticationDetails, CognitoUser,CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from './shared/session-storage.service';


const poolData = {
  UserPoolId: environment.aws_user_pools_id, // Your user pool id here
  ClientId:  environment.aws_user_pools_web_client_id // Your client id here  
};

const userPool = new CognitoUserPool(poolData);
 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationManagementService {

  private authenticatedBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  cognitoUser: any;
  loggedIn = false;
  public testLogin = "not tested";
  public authenticationEvent$: Observable<boolean> = this.authenticatedBehaviourSubject.asObservable();
  _data: any;

  constructor(private sessionStorageService: SessionStorageService) { 
      this.loggedIn = this.sessionStorageService.getItem('user-login-state', false);
 
}

signUp(email: string, password:string) {

  const attributeList:any[] = [];

  return Observable.create((observer:any) => {
      userPool.signUp(email, password, attributeList, [], (err, result:any) => {
          if (err) {
          observer.error(err);
          }

          this.cognitoUser = result.user;
          observer.next(result);
          observer.complete();
      });
  });
}

confirmSignUpLogin(username:string, code:string) {
  return Observable.create((observer:any) => {
      Auth.confirmSignUp(username, code).then(data => 
          observer.next(data))
        .catch(err => 
          observer.error(err));
  });
}

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
  let that = this;
  return Observable.create((observer:any) => {
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              that.loggedIn = true;
              that.sessionStorageService.setItem('user-login-state', true);
              observer.next(result);
              observer.complete();
          },
          onFailure: function(err) {
              observer.error(err);
          },
      });
  });
}

triggerEvent(state: boolean){
  this.authenticatedBehaviourSubject.next(state);
}

validateEmail(code:string) {
  const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
  };
  return Observable.create((observer:any) => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
          if (err) {
              observer.error(err);
          }
          observer.next(result);
          observer.complete();
      });
  });
}

resendCode() {
  return Auth.resendSignUp(this.cognitoUser.username)
}

resendCodeForUser(username: string){
  return Auth.resendSignUp(username);
}

// used to convert the callback method of authenticatedUser.getSession to a promise
getAccessTokenAsync(): Promise<string>{
  return new Promise((resolve, reject) => {
      var authenticatedUser: CognitoUser = this.getAuthenticatedUser();
      if(authenticatedUser == null) {
          resolve('');
      }
      authenticatedUser.getSession((error:any, session:any) => {
          if(error) {
            resolve('');
          }
          const token = session.getIdToken().getJwtToken();
          resolve(token);            
      });        
  });
}

getAuthenticatedUser() {
  // gets the current user from the local storage
  return userPool.getCurrentUser() as CognitoUser;
}


getUserRole(): Promise<string | null> {
  return new Promise((resolve) => {
    const authenticatedUser = this.getAuthenticatedUser();
    if (authenticatedUser) {
      authenticatedUser.getUserAttributes((err, attributes) => {
        if (!err && attributes) {
          // Example: If you stored the user's role as a custom attribute named 'role'
          const userRoleAttribute = attributes.find(attribute => attribute.getName() === 'custom:role');

          if (userRoleAttribute) {
            resolve(userRoleAttribute.getValue());
          } else {
            resolve(null); // User role not found
          }
        } else {
          resolve(null); // User is not authenticated or attributes are undefined
        }
      });
    } else {
      resolve(null); // User is not authenticated
    }
  });
}







signOut() {
  this.getAuthenticatedUser().signOut();
  this.cognitoUser = null;
  this.loggedIn = false;
  this.sessionStorageService.setItem('user-login-state', false);
  this.authenticatedBehaviourSubject.next(false);
}

changePassword(oldPassword:string, password:string): Promise<string> {
  let user  = this.getAuthenticatedUser();
  return Auth.changePassword(user, oldPassword, password);        
}

forgotPassword(email: string) {
  // 
  return Auth.forgotPassword(email);
}

isLoggedIn() {    
  return this.loggedIn;
}

forgotPasswordSubmit(email:string, code:string, password:string) {

  // Collect confirmation code and new password, then
  return Auth.forgotPasswordSubmit(email, code, password)

}
}


export interface CognitoError {
  code: string;
  message: string;
  name: string;
}