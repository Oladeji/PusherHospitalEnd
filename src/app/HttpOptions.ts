import { HttpHeaders, HttpParams } from '@angular/common/http';

export const Json_Up_ResponseDown: {
  headers?: HttpHeaders;
  observe: 'response';
  params?: HttpParams;
  reportProgress?: boolean;
  // responseType: "blob";
  withCredentials?: boolean;
} = {
  observe: 'response',
  //responseType: "blob",
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append('Access-Control-Allow-Origin', '*')
    .append('Accept', 'application/json')
};
export const Json_Up_Down: {
  headers?: HttpHeaders;
  observe: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  // responseType: "blob";
  withCredentials?: boolean;
} = {
  observe: 'body',
  // responseType: "blob",
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append('Access-Control-Allow-Origin', '*')
    .append('Accept', 'application/json')
};

export const FileUp_Json_Down: {
  headers?: HttpHeaders;
  //observe: "body";
  params?: HttpParams;
  reportProgress?: boolean;
  // responseType: "blob";
  withCredentials?: boolean;
} = {
  //observe: "body",
  //responseType: "blob",
  //   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }).append('Access-Control-Allow-Origin', '*')
  // .append("Accept", "application/json")
  headers: new HttpHeaders({}).append('Access-Control-Allow-Origin', '*')
    .append('Accept', 'application/json')
};

export const FileUp_pdf: {
  headers?: HttpHeaders;
  observe: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
   responseType: 'blob';
  withCredentials?: boolean;
} = {
  observe: 'body',
  responseType: 'blob',
  //   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }).append('Access-Control-Allow-Origin', '*')
  // .append("Accept", "application/json")
  headers: new HttpHeaders({}).append('Access-Control-Allow-Origin', '*')
   .append('Accept', 'application/pdf')
};


export const Json_Up_blobpdf_Down: {
  headers?: HttpHeaders;
  observe: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType: 'blob';
  withCredentials?: boolean;
} = {
  observe: 'body',
  responseType: 'blob',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append('Access-Control-Allow-Origin', '*')
    .append('Accept', 'application/pdf')


};
