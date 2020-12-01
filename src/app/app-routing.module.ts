import { RegisteringComponent } from './registering/registering.component';
import { ChatpageComponent } from './chatpage/chatpage.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =  [
  { path: '', component: RegisteringComponent },
 { path: 'Register', component: RegisteringComponent },
 { path: 'ChatPage', component: ChatpageComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
