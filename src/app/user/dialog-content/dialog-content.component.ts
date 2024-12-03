import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
  superAdminDialog = false;
  list: any;
  viewDialog = false;
  dataList: any;
  loader = false;
  userForm: FormGroup<any>;
  isFormSubmitted = false;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.userForm = fb.group({
      role: ['2', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.viewDialog = true;
    this.dataList = this.data.data;
  }

  updateValue(data: any) {
    return data.toUpperCase();
  }

  get userFormControl() {
    return this.userForm?.controls;
  }

  radioChange($event: MatRadioChange) {
    if ($event.value === 'false') {
    } else {
    }
  }

  editRole() {
    this.viewDialog = false;
    let data = this.dataList;
    this.userForm?.patchValue({
      role: data['User Role']
    });
  }

  updateForm() {
    this.loader = true;
    let id = this.dataList['Unique Id'];
    this.isFormSubmitted = true;
    if (this.userForm?.valid) {
      this.isFormSubmitted = false;
      let data = {
        user_role: this.userForm?.controls['role'].value,
      };

      this.commonService.updateUser(data, id,localStorage.getItem('Unique_id')).subscribe(
        (res) => {
          this.loader = false;
          if (res.status === 200) {
            this.commonService.displaySwal(res.message, 'Success!', 'success');
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
    } else {
      this.loader = false;
      return;
    }
  }
}
