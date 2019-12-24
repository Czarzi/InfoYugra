import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AppComponent } from '../app.component';
import {MatDialog} from '@angular/material/dialog'


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    data: any;
    resp: any;
    items: any;
    offs_enroll: String;
    startIndex = 0;
    endIndex = 10;
    
    constructor(
        private httpClient: HttpClient,
        private appComponent: AppComponent,
        public dialog: MatDialog
    ) {}

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
                var invalidEntries = 0;
                this.data = data;
                console.log("Проверка: ", this.data);
                this.data = this.data.filter(acc => acc.account_payment && acc.account_payment.account_number);
                this.items = data;
                
            });
        this.httpClient.get("http://192.168.43.173:8000/user-diagram-value", {headers: getHeaders})
            .subscribe(resp => {
                this.resp = resp;
                console.log("Diagram value: ", this.resp);
            })
    }
    // events
    onClickDetails(i) {
        var details = document.getElementById("detailsBlock" + i);
        if (details.style.display === "none"){
            details.style.display = "block";
        } else {
            details.style.display = "none";
        }
    }
    getArrayFromNumber(length){
        let n = Math.ceil(length/10);
        return new Array(n);
    }
    updateIndex(pageIndex){
        this.startIndex = pageIndex * 10;
        this.endIndex = this.startIndex + 10;
    }
    logout(){
        this.appComponent.logout();
    }

    openDialog(i) {
        const dialogRef = this.dialog.open(DialogContentExampleDialog + i);
    
        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
    }
}

@Component({
    selector: 'dialog-details',
    templateUrl: 'dialog-details.html',
})
export class DialogContentExampleDialog {
    data: any;
    resp: any;
    items: any;
    offs_enroll: String;
    startIndex = 0;
    endIndex = 10;
    
    constructor(
        private httpClient: HttpClient,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        const getHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('access_token')
        });
        //http://jsonplaceholder.typicode.com/todos
        //http://192.168.43.173:8000/user-bonus-transactions/
        this.httpClient.get("http://192.168.43.173:8000/user-bonus-transactions/", {headers: getHeaders})
            .subscribe(data => {
                var invalidEntries = 0;
                this.data = data;
                console.log("Проверка: ", this.data);
                this.data = this.data.filter(acc => acc.account_payment && acc.account_payment.account_number);
                this.items = data;
                
            });
        this.httpClient.get("http://192.168.43.173:8000/user-diagram-value", {headers: getHeaders})
            .subscribe(resp => {
                this.resp = resp;
                console.log("Diagram value: ", this.resp);
            })
    }
    onClickDetails(i) {
        var details = document.getElementById("detailsBlock" + i);
        if (details.style.display === "none"){
            details.style.display = "block";
        } else {
            details.style.display = "none";
        }
    }
}