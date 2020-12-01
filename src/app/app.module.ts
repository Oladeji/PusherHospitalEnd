
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { ToastrModule } from 'ngx-toastr';
import { ChatComponent } from './chat/chat.component';
import { AsyncPipe } from '@angular/common';
import { ChatpageComponent } from './chatpage/chatpage.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisteringComponent } from './registering/registering.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatpageComponent,
    RegisteringComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,AngularFireModule.initializeApp(environment.firebase),
    FormsModule,ReactiveFormsModule,AppRoutingModule,
    HttpClientModule, BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ToastModule.forRoot(),AngularFireFunctionsModule,
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    })
  ],
  providers: [ AsyncPipe, MDBSpinningPreloader ,  { provide: REGION, useValue: 'us-central1' }],
  //providers: [ MDBSpinningPreloader ,  { provide: REGION, useValue: 'http://localhost:4200' }],
  
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
