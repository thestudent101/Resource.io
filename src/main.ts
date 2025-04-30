import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { environment } from './environments/environment';


import { AppModule } from './app/app.module';

const awsconfig = {
    "aws_project_region": environment.aws_project_region,
    "aws_cognito_identity_pool_id": environment.aws_cognito_identity_pool_id,
    "aws_cognito_region": environment.aws_cognito_region,
    "aws_user_pools_id": environment.aws_user_pools_id,
    "aws_user_pools_web_client_id": environment.aws_user_pools_web_client_id,
    "oauth": {}
};


Amplify.configure(awsconfig);
// configureAmplify();

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
