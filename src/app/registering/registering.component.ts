import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Defaultvalues } from '../Defaultvalues';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-registering',
  templateUrl: './registering.component.html',
  styleUrls: ['./registering.component.scss']
})
export class RegisteringComponent implements  OnInit {
  title = '';
  frm_brodcastmsg: any;
  frm_register: any;
  AllPatients: Observable<any>;
  SelectedPatient: any;

PatientoptionsSelect: Array<any>;
  newid: any;

 constructor(
    private messagingService: MessagingService,
    private fb: FormBuilder, private toastr: ToastrService) {
    }


    ngOnInit() {
      this.frm_brodcastmsg = this.fb.group({

       body: [''],
       extrabody: [''],
       title: ['MSGTITLE'],
       icon: ['qq'],
       PatientNo: ['AKOMSKEY'],
       HospitalId: Defaultvalues.HospitaID,
       PatientId: [''],
       RegDate: Date.now()


   });

      this.frm_register = this.fb.group({

     PatientNo: ['AKOMSKEY'],
     HospitalId: Defaultvalues.HospitaID,
     RegDate: Date.now(),
     Status: 'OPEN',
 });

// this.AllPatients
      this.messagingService.retrieveAllPatientsInfoForHospital(Defaultvalues.HospitaID).subscribe((x: any) => {
         this.PatientoptionsSelect = [] ;
         x.forEach(Patient => {
            this.PatientoptionsSelect.push({value: Patient.PatientId, label: Patient.PatientNo + ' -' + Patient.PatientId, HospitalId: Patient.HospitalId, PatientNo: Patient.PatientNo});})


 }, x => {
   console.log('Error x');
 });




}

// callableJsonUpGetJsonDown(url , data)
// {
//    this.messagingService.callableJsonUpGetJsonDown(url, data)
//    .subscribe(x => {
//         console.log(x);
//         console.log(x);
//         this.toastr.success(x.id , ' : Data Added Succesfully ...... ' );
//    });
// }

 GetPatient(url, data)
{
  return this.messagingService.callableJsonUpGetJsonDown(url, data);

}
 PatientExists(url, data)
{
  return this.messagingService.callableJsonUpGetJsonDown(url, data);

}

ChatPatient(patiendid)
{

  this.SelectedPatient = patiendid ;


}

 SendMessageToPatient()
 {
   console.log('printing Id and co');
   console.log(this.frm_brodcastmsg.value);
   if (this.getSelectedValueUsingPatientNo(this.frm_brodcastmsg.value.PatientNo))
   {
     
         this.messagingService.callableJsonUpGetJsonDown( Defaultvalues.SendMessageUrl, this.frm_brodcastmsg.value)
       .subscribe(x => {
        this.newid=x.id;
        console.log(x);
        this.toastr.success(x.id , ' : Data Added Succesfully ...... ' );
      });




   }else{
         this.toastr.error('Patient No : ' + this.frm_brodcastmsg.value.PatientNo + ' NOT  FOUND  ' );

   }
 }
 SendMessageToPatientFromList()
 {
   console.log('printing Id and co');
   console.log(this.frm_brodcastmsg.value);

        this.messagingService.callableJsonUpGetJsonDown( Defaultvalues.SendMessageUrl, this.frm_brodcastmsg.value)
       .subscribe(x => {

        console.log(x);
        this.toastr.success(x.id , ' : Data Added Succesfully ...... ' );
      });

 }

 getSelectedValueUsingPatientId(event: any) {
  console.log('Selected value');
  console.log(event);
  if  (event === this.frm_brodcastmsg.value.PatientId)
  {
  const Patient = this.PatientoptionsSelect.find(e => e.value === event);
  this.frm_brodcastmsg.get('PatientNo').patchValue(Patient.PatientNo);
  this.frm_brodcastmsg.get('HospitalId').patchValue(Patient.HospitalId);

  }
}

 getSelectedValueUsingPatientNo(PatientNo: any) {

  const Patient = this.PatientoptionsSelect.find(e => e.PatientNo === PatientNo);
  
  console.log("Check Below")
  console.log(this.PatientoptionsSelect)
  console.log(Patient)
  if (Patient)
  {
  this.frm_brodcastmsg.get('PatientId').patchValue(Patient.value);
  this.frm_brodcastmsg.get('HospitalId').patchValue(Patient.HospitalId);
   return true;
  }
  return false;
}


//  RegisterPatient2()
//  {
// //   this.FindPatient (Defaultvalues.FindPatientUrl, this.frm_register.value);


//  // tslint:disable-next-line: align
//    const   p = this.FindPatient (Defaultvalues.ExistsPatientUrl, this.frm_register.value);
//    p.subscribe((x) => {
// if (x)
//   this.callableJsonUpGetJsonDown(Defaultvalues.RegisterPatientUrl, this.frm_register.value);


//  });
//  }

 RegisterPatient()
 {

 // tslint:disable-next-line: align
   this.PatientExists (Defaultvalues.ExistsPatientWtOpenStatusUrl, this.frm_register.value).
   subscribe((x) => {
       if (x){
           // tslint:disable-next-line: max-line-length
           this.toastr.error('Patient No : ' + this.frm_register.value.PatientNo + ' ALREADY exists with OPEN status in  ' + this.frm_register.value.HospitalId );

           console.log('Answer ', x);
              }
       else {


         this.messagingService.callableJsonUpGetJsonDown( Defaultvalues.RegisterPatientUrl, this.frm_register.value)
       .subscribe(x => {
        
        console.log(x);
        this.toastr.success(x.id , ' : Data Added Succesfully ...... ' );
      });


            // this.toastr.success(`Patient No : ${this.frm_register.value.PatientNo} is available  ${this.frm_register.value.HospitalId}` );

                  }

  }
 );

 }

//  RegisterPatient()
//  {
//    console.log(this.frm_register.value)
//    console.log(JSON.stringify(  this.frm_register.value))
//   // this.messagingService.RegisterPatient(this.frm_register.value);
//   this.messagingService.SendToFirebase('PatientsInfowtDate',this.frm_register.value);

//  //   this.messagingService.LoginPatient({'PatiendId':this.frm_login.value.UserKey,Hospitalid:this.frm_login.value.Password,token:x.token})

//  }
//  RegisterPatientsQueueDetails()
//  {
//    console.log(this.frm_brodcastmsg.value)
//    this.messagingService.SendToFirebase('PatientsQueueDetails',this.frm_brodcastmsg.value);

//   // this.messagingService.RegisterPatient(this.frm_register.value);
//  //   this.messagingService.LoginPatient({'PatiendId':this.frm_login.value.UserKey,Hospitalid:this.frm_login.value.Password,token:x.token})

//  }

}
