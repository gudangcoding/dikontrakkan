import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class restApi{
    server : string = "https://reqres.in/api/";

    constructor(private http : HttpClient){}

    post(body: any, api: string) {
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        let url = this.server + api;
        return this.http.post(url, JSON.stringify(body), httpOptions).pipe((res)=>res);
    }
    
}