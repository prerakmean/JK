import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

export interface AdminList {
  name: string;
  email: string;
  unique_id: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  ingestionStatus: any[] = [];
  loader: boolean = false;
  user_id: any;

  constructor(
    private commonService: CommonService,
    private router: Router,
  ) {
    this.user_id = localStorage.getItem('Unique_id') || '';
    this.fetchStatus(this.user_id);
  }

  ngOnInit(): void {
  
  }

  // triggerIngestion(): void {
  //   this.loader = true;
  //   this.ingestionService.triggerIngestion(this.user_id).subscribe(
  //     (response:any) => {
  //       console.log('Ingestion started:', response);
  //       this.loader = false;
  //       this.fetchStatus();
  //     },
  //     (error:any) => {
  //       console.error('Error triggering ingestion:', error);
  //       this.loader = false;
  //     }
  //   );
  // }

  triggerIngestion() {

    this.loader = true;
      this.commonService.triggerIngestion(this.user_id).subscribe(
        (res) => {
          this.loader = false;
          this.fetchStatus(this.user_id);
          if (res.status === 200) {
            this.commonService.displaySwal(res.message, 'Success!', 'success');
            this.fetchStatus(this.user_id);
            // this.dialogRef.close();
          } else {
            this.commonService.displaySwal(res.message, 'Info!', 'info');
          }
        },
        (err) => {
          this.loader = false;
          console.log(err);
        }
      );
  }


  // fetchStatus(): void {
  //   this.ingestionService.getIngestionStatus(this.user_id).subscribe(
  //     (response:any) => {
  //       this.ingestionStatus = response;
  //     },
  //     (error:any) => {
  //       console.error('Error fetching status:', error);
  //     }
  //   );
  // }

  fetchStatus(id: any) {
    this.loader = true;
    this.commonService.getIngestionStatus(id).subscribe(
      (res) => {
        this.ingestionStatus = res;
        if (res.status === 200) {
          this.ingestionStatus = res;
        } else if (res.status === 403) {
        } else if (res.status === 401) {
          localStorage.clear();
          this.commonService.displaySwal(res.message, 'Info!', 'info');
          this.router.navigateByUrl('/login');
        }
        this.loader = false;
      },
      (err) => {
        this.loader = false;
        console.log(err);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
