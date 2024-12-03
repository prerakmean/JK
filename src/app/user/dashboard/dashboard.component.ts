import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
  ){
    let data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')|| '') : null;
    if (data != null && Object.keys(data).length > 0 ) {
        console.log(data)
      } 
  }



  ngOnInit(): void {
    
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


}
