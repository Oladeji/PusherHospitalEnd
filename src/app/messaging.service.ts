import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonFunctions } from './CommonFunctions';
import { Json_Up_Down } from './HttpOptions';
import { catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
// import * as firebase from 'firebase';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  AllPatients: any;

  constructor(
    private firestore: AngularFirestore,
    private _http: HttpClient ,
    private fns: AngularFireFunctions)  {

  }

  PostJsonUpGetJsonDown2(destinationurl: string, logindata: any) {
  console.log(destinationurl);
  console.log(logindata);
  const dt = JSON.stringify(logindata);
  console.log(dt);
  return this._http
  .post(destinationurl, destinationurl, Json_Up_Down)
  .pipe(
    catchError(error => new CommonFunctions().handleError(error))
  );
}


 callableJsonUpGetJsonDown(path: string, logindata: any): Observable<any>
{
      console.log(logindata);

      const callable = this.fns.httpsCallable(path);
      return callable(logindata);

}
// RegisterPatient( Patient)
// {
//     console.log("Patient B$ sending to Firebase :",Patient)
//     return new Promise <any> ((resolve,reject)=>{
//       this.firestore.collection('PatientsInfowtDate')
//       .add(Patient)
//       .then( res=>{
//         console.log("Patient Added :",Patient)
//         console.log("Patient Added :",res)
//       },err=>reject(err));
//     });
// }

// SendToFirebase(kolection, data)
// {
//     console.log("Patient B$ sending to Firebase :",data)

//       return new Promise <any> ((resolve,reject)=>{
//       this.firestore.collection(kolection)
//       .add(data)
//       .then( res=>{
//         console.log("data Added :",data)
//         console.log("response :",res)
//       },err=>reject(err));
//     });
// }

   retrieveAllPatientsInfoForHospital(HospitalId) {
       console.log('Calling ', HospitalId);
       return   this.firestore.collection('Patients', ref =>
                  ( ref.where('HospitalId', '==', HospitalId))).valueChanges();

    }
}
