import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient, private router:Router) { }
  //check for if logged in
    public userStatus: string;
    public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
    setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
    }
  //login
    public login(username:string, password:string){
        
        //localStorage.setItem('access_token', 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNjMzLCJ1c2VybmFtZSI6Im85MDFtbUBtYWlsLnJ1IiwiZXhwIjoxNTc1ODg1ODg3LCJlbWFpbCI6Im85MDFtbUBtYWlsLnJ1In0.zZVaRskcH-3E_teP_NMlth5ltCmx9hGXA3A-ZqAW6uc');
        let user = {
            username: username,
            password: password
        }
        const postHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        //http://jsonplaceholder.typicode.com/todos
        //http://192.168.43.173:8000/api-token-auth/
        this.httpClient.post("http://192.168.43.173:8000/api-token-auth/",  JSON.stringify(user), {headers: postHeaders}).subscribe(res => {
            //set the token to localStorage
            console.log(res);
            localStorage.setItem("access_token", res["token"]);
            this.setUserStatus(res["token"]);
            console.log(localStorage);
            this.router.navigate(["/"]);
        });


        // const getHeaders = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': localStorage.getItem('access_token')
        // });
        console.log(localStorage.getItem('access_token'));

        
        //this.httpClient.get("http://192.168.43.237:8000/user-bonus-transactions/");
        // this.httpClient.get("http://192.168.43.173:8000/user-bonus-transactions/", {headers: getHeaders}).subscribe(res => {
        //     console.log(res["token"]);
        // }); 
    }

    public getJWT(){
        localStorage.getItem('access_token');
    }
//o901mm@mail.ru
//password

    public logout(){
        //just remove the access token and redirect
        console.log("user logged out successfully");
        localStorage.removeItem('access_token');
        this.setUserStatus(null);
        this.router.navigate(["/login"]);
        
    }

  //signup
    public signup(email:string, password:string){
        
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
    
        let user = {
        email: email,
        password: password
        }

        //send a post request to the 
        this.httpClient.post("http://localhost:8000/api/auth/signup", JSON.stringify(user), {headers: headers}).subscribe(res => {
            //set the token to localStorage
            localStorage.setItem("access_token", res["token"]);
            this.setUserStatus(res["token"]);
            console.log(res["token"])
            this.router.navigate(["/"]);
        });
    }

    public getStatusOnRefresh(){
        
        if(localStorage.getItem("access_token")){
        this.setUserStatus(localStorage.getItem("access_token"))
        //console.log(this.userStatus)
        }
    }
    ngOnInit() {
        
    }
}
