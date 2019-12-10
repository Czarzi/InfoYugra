import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private httpClient: HttpClient, 
    ) {}
    public loginForm = new FormGroup({
        email: new FormControl('',  Validators.required),
        password: new FormControl('',  Validators.required),
    }); 

    login(formData: FormData){
        this.authService.login(formData["email"], formData["password"]);
    }

    ngOnInit() {
    }
}
