import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  submitted = false;   // To track submission status
  users: any[] = [];   // To store fetched user data

  constructor(private http: HttpClient) {}  // Correct constructor syntax

  // Method to fetch data from the server
  fetchData() {
    this.http.get('http://localhost:3000/get-users')
      .subscribe(response => {
        this.users = response as any[];  // Assuming the response is an array
        console.log('Data fetched successfully', response);
      }, error => {
        console.error('Error fetching data:', error);
      });
  }

  // Call fetchData() when the component initializes
  ngOnInit() {
    this.fetchData();
  }
}