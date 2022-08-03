import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { JobtypeService } from 'src/app/services/jobtype.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-job-type',
  templateUrl: './job-type.component.html',
  styleUrls: ['./job-type.component.css']
})
export class JobTypeComponent implements OnInit {
  jobtypes:any;
  jobType="";

  successMessage = '';
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  constructor(private jobTypeService:JobtypeService,private registerService:RegisterService) { }

  ngOnInit(): void {
    this.jobtypes = this.jobTypeService.getJobTypes();
   
  }
  onSubmit(){
    this.registerService.updateJob(localStorage.getItem('username'),this.jobType).subscribe(
      (responce:any)=>{

      },
      error=>{
        if(error.status===200){
          this.successMessage="Your job-type is updated.";
          setTimeout(() => this.selfClosingAlert.close(), 5000);
        }
        else{
          this.successMessage="There is some error!";
          setTimeout(() => this.selfClosingAlert.close(), 5000);
        }
      }
    )
    
  }

}
