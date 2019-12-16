import { Component, OnInit, NgModule, LOCALE_ID } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from '../auth.service';
import { isNgTemplate } from '@angular/compiler';
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
    data: any;
    collection = [];
    
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    public postForm = new FormGroup({
    title: new FormControl('',  Validators.required),
    content: new FormControl('',  Validators.required),
    });

    ngOnInit() {
        const getHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access_token')
        });
        //http://jsonplaceholder.typicode.com/todos
        //http://192.168.43.173:8000/user-bonus-transactions/
        this.httpClient.get("http://192.168.43.173:8000/user-bonus-transactions/", {headers: getHeaders})
            .subscribe(data => {
                console.log("data: ", data);
                var invalidEntries = 0;
                function isNumber(data){
                    return data !== undefined && data !==null && !isNaN(data)
                };
                function filterByID(data) {
                    if (isNumber(this.data.account_payment.account_number) && this.data.account_payment.account_number !== 0) {
                        return true;
                    }
                    return false;
                }
                this.data = data;
                this.data.filter(filterByID);
                // for(let i=0; i < this.data.account_payment.account_number; i++){
                //     if(!this.data.account_payment.account_number) {
                //         return "Отсутствует";
                //     }else{
                //         return this.data.account_payment.account_number;
                //     }
                // }
                for(let i=1;i<=10;i++){
                    this.collection.push(data);
                }
            });
    }
}
