
import { Observable, throwError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


export class CommonFunctions {
   public GetItemFromStorage(Id: string) { return localStorage.getItem(Id); }

  public RemoveItemFromStorage(Id: string) { localStorage.removeItem(Id); }

  // public PutItemInStorage(Id: string, item: any) { localStorage.setItem(Id, JSON.stringify(item)); }
  public Generatepwd(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  public EncodeGeneratepwd(password: string) {// this just shift the postion of the password by two
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_';
    for (let i = 0; i < password.length; i++) {
      //    let s = password.charAt(i);
      //    let p = characters.indexOf(s);

      //  result += characters.charAt( p  +2 );//  characters.charAt(Math.floor(Math.random() * charactersLength));

      result += characters.charAt(characters.indexOf(password.charAt(i)) + 1);//  characters.charAt(Math.floor(Math.random() * charactersLength));


    }


    return result;
  }
  DecodeGeneratepwd(password: string) {// this just shift the postion of the password by two
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_';
    for (var i = 0; i < password.length; i++) {

      //  result += characters.charAt(characters.indexOf( password.charAt(i))-2);
      //  let s = password.charAt(i);
      //    let p = characters.indexOf(s);

      //  result += characters.charAt( p  -2 );
      result += characters.charAt(characters.indexOf(password.charAt(i)) - 1);//  characters.charAt(Math.floor(Math.random() * charactersLength));

    }


    return result;
  }
  public PutJSONItemInStorage(Id: string, item: any) { localStorage.setItem(Id, item); }

  public handleError(error: any) {
    console.log(error);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //  console.error('An error occurred:', error.error.message);
      return throwError(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //  console.error(
      //  `Backend returned code ${error.status}, ` +
      //`body was: ${error.error}`);
      return throwError(error.error);
    }
    // return an ErrorObservable with a user-facing error message
    // return throwError(
    //   'Something bad happened; please try again later.');
  }
 public handleErroreffect(error: any) {
    console.log(error);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //  console.error('An error occurred:', error.error.message);
      return (error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //  console.error(
      //  `Backend returned code ${error.status}, ` +
      //`body was: ${error.error}`);
      return (error.error);
    }
    // return an ErrorObservable with a user-facing error message
    // return throwError(
    //   'Something bad happened; please try again later.');
  }
  parseErrorBlob(err: HttpErrorResponse): Observable<any> {
    if (err == null) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError('A client-side or network error occurred or Wrong URL');
    }
    else {
      const reader: FileReader = new FileReader();
      const obs = Observable.create((observer: any) => {
        reader.onloadend = (e) => {
        observer.error(reader.result.toString());
        observer.complete();
        };
      });
      reader.readAsText(err.error);
      return obs;
    }
  }


  parseErrorBlobold(err: HttpErrorResponse) {

    let errorMessage = 'wrong stuff';
    if (err.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${err.error.message}`;
    } else

      if (err == null) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = 'A client-side or network error occurred';
      } else

        if (err instanceof HttpErrorResponse && err.status == 404) {
          errorMessage = "Data Not Found";
        } else {
          console.log(err.headers.get('Content-Type'));
          const reader: FileReader = new FileReader();

          const obs = Observable.create((observer: any) => {
            reader.onloadend = (e) => {
              observer.error(reader.result.toString());
              observer.complete();


            }
          });
          reader.readAsText(err.error);

          console.log(reader.result);
          errorMessage = reader.result.toString();
          // return   throwError(reader.result);
        }
    return throwError(errorMessage);
  }

}
