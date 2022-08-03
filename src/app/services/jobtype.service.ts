import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobtypeService {
  jobTypes=[
    "Accounting",
    "Accounting and Finance",
    "Account Management",
    "Account Management/Customer Success",
    "Administration and Office",
    "Advertising and Marketing",
    "Animal Care",
    "Arts",
    "Business Operations",
    "Cleaning and Facilities",
    "Computer and IT",
    "Construction",
    "Corporate",
    "Customer Service",
    "Data and Analytics",
    "Data Science",
    "Design",
    "Design and UX",
    "Editor",
    "Education",
    "Energy Generation and Mining",
    "Entertainment and Travel Services",
    "Farming and Outdoors",
    "Food and Hospitality Services",
    "Healthcare",
    "HR",
    "Human Resources and Recruitment",
    "Installation, Maintenance, and Repairs",
    "IT",
    "Law",
    "Legal Services",
    "Management",
    "Manufacturing and Warehouse",
    "Marketing",
    "Mechanic",
    "Media, PR, and Communications",
    "Mental Health",
    "Nurses",
    "Office Administration",
    "Personal Care and Services",
    "Physical Assistant",
    "Product",
    "Product Management",
    "Project Management",
    "Protective Services",
    "Public Relations",
    "Real Estate",
    "Recruiting",
    "Retail",
    "Sales",
    "Science and Engineering",
    "Social Services",
    "Software Engineer",
    "Software Engineering",
    "Sports, Fitness, and Recreation",
    "Transportation and Logistics",
    "Unknown",
    "UX",
    "Videography",
    "WriterWriting and Editing"
  ]
  constructor() { }

  getJobTypes(){
    return this.jobTypes;
  }
}
