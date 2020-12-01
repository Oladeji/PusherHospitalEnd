import { Observable } from 'rxjs';
import { Defaultvalues } from './Defaultvalues';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessagingService } from './messaging.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Hospital End';


 
 constructor()
    {
    }


}
