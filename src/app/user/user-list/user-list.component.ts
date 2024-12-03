import { Component, DoCheck, OnChanges, ViewChild } from '@angular/core';

import { CommonService } from 'src/app/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from 'src/app/user/dialog-content/dialog-content.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
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
    this.getUserData(this.user_id);
  }

  ngOnInit(): void {
    this.commonService.currentLoadData.subscribe((data) => {
      if (data) {
        this.getUserData(this.user_id);
      }
    });
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

  getUserData(id: any) {
    this.loader = true;
    this.commonService.getUserData(id).subscribe(
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

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  updateData(data: any) {
    this.loader = true;
    let temp = [...data];
    this.displayedColumns = {
      username: 'Username',
      email: 'Email',
      user_role: 'User Role',
      unique_id: 'Unique Id',
    };
    this.historyColumns = ['PARAM0', 'PARAM1'];
    Object.keys(this.displayedColumns).map((key) => {
      if (this.displayedColumns[key] !== '') {
        this.historyColumns.push(key);
      }
    });
    this.historyColumns = this.historyColumns.sort(
      (a: any, b: any) => a.substring(5) - b.substring(5)
    );
    this.displayedColumns['PARAM0'] = 'ACTION';
    this.displayedColumns['PARAM1'] = 'DELETE';
    let final = temp;
    this.pageLength = final.length;
    this.dataSource = new MatTableDataSource(final);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loader = false;
    this.commonService.changeLoadData(false);
  }

  reloadData() {
    this.historyColumns = [];
    this.getUserData(this.user_id);
  }

  getDetails(data: any) {
    this.openDialog(data);
  }

  openDialog(data: any) {
    let newData = {
      Username: data.username,
      Email: data.email,
      'User Role': data.user_role,
      'Unique Id': data.unique_id,
    };
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { type: 'viewDialog', data: newData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getUserData(localStorage.getItem('Unique_id'));
      }
    });
  }

  deletetask(data: any) {
    this.loader = true;
    console.log(data)
    this.commonService
      .deleteUser(data.unique_id, localStorage.getItem('Unique_id'))
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.getUserData(localStorage.getItem('Unique_id'));
            this.commonService.displaySwal(res.message, 'Success!', 'success');
          } else if (res.status === 404) {
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
}

