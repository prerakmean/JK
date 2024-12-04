import { Component, DoCheck, OnChanges, ViewChild } from '@angular/core';

import { CommonService } from 'src/app/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-ingestion',
  templateUrl: './ingestion.component.html',
  styleUrls: ['./ingestion.component.scss']
})
export class IngestionComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  pageSize = 5;
  pageLength = 0;
  loader = false;
  historyColumns: any[] = [];
  dataSource: any;
  displayedColumns: any;
  user_id: any;
  tableData = [];
  loadData = false;

  constructor(
    private commonService: CommonService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.user_id = localStorage.getItem('Unique_id') || '';
    this.getIngestionData(this.user_id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeDate(value: any) {
    return this.commonService.formatDate(new Date(value));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      this.dataSource.sort = this.sort;
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getIngestionData(id: any) {
    this.loader = true;
    this.commonService.getIngestionStatus(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.tableData = res.data;
          this.historyColumns = [];
          this.updateData(res.data);
        } else if (res.status === 403) {
          this.tableData = [];
          this.updateData([]);
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
  reloadData() {
    this.historyColumns = [];
    this.getIngestionData(this.user_id);
  }

  updateData(data: any) {
    console.log("adta",data)
    this.loader = true;
    let temp = [...data];
    this.displayedColumns = {
      unique_id: 'ID',
      status: 'Status',
      startTime: 'StartTime',
    };
    Object.keys(this.displayedColumns).map((key) => {
      if (this.displayedColumns[key] !== '') {
        this.historyColumns.push(key);
      }
    });
    this.historyColumns = this.historyColumns.sort(
      (a: any, b: any) => a.substring(5) - b.substring(5)
    );
    let final = temp;
    this.pageLength = final.length;
    this.dataSource = new MatTableDataSource(final);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loader = false;
    this.commonService.changeLoadData(false);
  }

  addIngestion() {

    this.loader = true;
      this.commonService.addIngestion(this.user_id).subscribe(
        (res) => {
          if (res.status === 200) {
            this.loader = false;
            this.reloadData();
            this.commonService.displaySwal(res.message, 'Success!', 'success');
          
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

  getTimeDifference(givenTime: any): any {
    const now = new Date(); // Current time
    const givenDate = new Date(givenTime); // Parse the given time

    const differenceInMs = now.getTime() - givenDate.getTime(); // Difference in milliseconds

    // Convert milliseconds into meaningful units
    const seconds = Math.floor(differenceInMs / 1000) % 60;
    const minutes = Math.floor(differenceInMs / (1000 * 60)) % 60;
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60)) % 24;
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    return `${hours}:${minutes}:${seconds} ago`
      // days-
      // hours,
      // minutes,
      // seconds,
    
  }


}
