import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  token: string;
  currentUser: string;
  constructor() { }
  ngOnInit(): void {
    this.token = localStorage.getItem('tokenscloud');
  }
}


