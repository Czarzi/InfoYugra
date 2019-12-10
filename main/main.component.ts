import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from '../auth.service';
//import * as Chart from 'chart.js';

export interface jsonTables {
    date_created: any;
    account_number: Number;
    type_payment: String;
    value: Number;
}

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    public postForm = new FormGroup({
    title: new FormControl('',  Validators.required),
    content: new FormControl('',  Validators.required),
    }); 

    createPost(formData: FormData){
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        let post = {
            title: formData["title"],
            content: formData["content"]
        }
    }

    ngOnInit() {
        const getHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access_token')
        });
        //http://jsonplaceholder.typicode.com/todos
        //http://192.168.43.173:8000/user-bonus-transactions/
        this.httpClient.get("http://192.168.43.173:8000/user-bonus-transactions/", {headers: getHeaders})
            .subscribe(data => {
                console.log("data: ", data[1]);
            }); 
    }
}
