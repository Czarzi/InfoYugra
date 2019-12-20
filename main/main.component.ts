import { Component, OnInit, NgModule, LOCALE_ID } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from '../auth.service';
import { isNgTemplate } from '@angular/compiler';
import {PageEvent} from '@angular/material/paginator';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts/bundles/ng2-charts.umd.js';
// import CanvasJS from 'canvasjs';
// import * as CanvasJS from '/src/templates/canvasjs.min.js';
//import * as Chart from 'chart.js';
// import { NgxPaginationModule } from 'ngx-pagination';

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
    offs_enroll: String;
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent;
    ///////pieChart
    public pieChartOptions: ChartOptions = {
        responsive: true,
    };
    public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
    public pieChartData: SingleDataSet = [30, 50, 20];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
    /////////////////////
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

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
        // let chart = new CanvasJS.Chart("chartContainer", {
        //     theme: "light2",
        //     animationEnabled: true,
        //     exportEnabled: true,
        //     title:{
        //         text: "Monthly Expense"
        //     },
        //     data: [{
        //         type: "pie",
        //         showInLegend: true,
        //         toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        //         indexLabel: "{name} - #percent%",
        //         dataPoints: [
        //             { y: 450, name: "Food" },
        //             { y: 120, name: "Insurance" },
        //             { y: 300, name: "Traveling" },
        //             { y: 800, name: "Housing" },
        //             { y: 150, name: "Education" },
        //             { y: 150, name: "Shopping"},
        //             { y: 250, name: "Others" }
        //             ]
        //         }]
        // });
            
        // chart.render();
        // this.data = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    }
    onClickDetails(i) {
        var details = document.getElementById("detailsBlock" + i);
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

    // typePayment(i){
    //     if(this.data.value[i] == "-"){
    //         return this.offs_enroll = "Cписание";
    //     }else{
    //         return this.offs_enroll = "Зачисление";
    //     }
    // }

    // pagination(){
    //     $(document).ready(function () {
    //         $('#dtBasicExample').DataTable();
    //         $('.dataTables_length').addClass('bs-select');
    //     });
    // }
}
