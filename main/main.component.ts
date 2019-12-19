import { Component, OnInit, NgModule, LOCALE_ID } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
// import { NgxPaginationModule } from 'ngx-pagination';
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
    items: any;
    pageOfItems: Array<any>;
    
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
                this.data = data;
                console.log("Проверка: ", this.data);
                this.data = this.data.filter(acc => acc.account_payment && acc.account_payment.account_number);
                this.items = data;
            });
        // this.data = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    }
    onClickDetails() {
        var details = document.getElementById("detailsBlock");
        if (details.style.display === "none"){
            details.style.display = "block";
        } else {
            details.style.display = "none";
        }
    }
    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
    calcBonus() {
        var bonus = this.data.value;
        bonus = bonus.reduce(function (previousValue, value){
            return previousValue + value;
        });
    }
}
