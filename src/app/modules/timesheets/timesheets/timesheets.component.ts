import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetsService } from '../timesheets.service';
// import{ error} from
import { DatePipe } from '@angular/common';
// import{}
import { SessionService } from 'src/app/shared/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})

export class TimesheetsComponent implements OnInit {


  private minutesPerHour = 60;
  duration: number = 0;

  editEntry: boolean = false;

  editedEntry: any;

  entryCompanyName = '';
  entryDescription = '';
  entryActivity = '';
  entryMinutes = 0;
  entryHours = 0;
  entryNotes = '';

  private currDate:any;

  panelOpenState = true;

  // 
  entries = {
    "contracts": [
      {
        "company": {
          "name": "Health Care Solutions"
        },
        "timesheets": [
          {
            "id": "5f27cf2217db9e797153c427",
            "date": "2020-08-01",
            "minutes": 240,
            "description": "Technical",
            "activity": "QA Environment Configuration"
          }
        ]
      },
      {
        "company": {
          "name": "Health Care Solutions"
        },
        "timesheets": [
          {
              "id": "5f27cf6317db9e797153c429",
              "date": "2020-08-01",
              "minutes": 120,
              "description": "Stationary Acquisition",
              "activity": "Admin"
          }
        ]
      },
      {
        "company": {
          "name": "Health Care Solutions"
        },
        "timesheets": [
          {
              "id": "5f27cf4a17db9e797153c428",
              "date": "2020-08-01",
              "minutes": 120,
              "description": "Sprint Planning",
              "activity": "Meetings"
          }
        ]
      }
    ]
  };

  contractRefData = {
    "contracts": [
      {
          "company": {
              "name": "ABC Inc."
          },
          "activities": [
              {
                  "name": "Admin"
              },
              {
                  "name": "Meetings"
              },
              {
                  "name": "Technical"
              }
          ]
      },
      {
        "company": {
            "name": "Health Care Solutions"
        },
        "activities": [
          {
              "name": "Admin1"
          },
          {
              "name": "Meetings1"
          },
          {
              "name": "Technical1"
          }
        ]
      }
    ]
  }

  projects = [
    {value: 'Blue Platform'},
    {value: 'BI and Analytics'},
    {value: 'Web Development'}
  ];

  activities = [
    {value: 'Technical'},
    {value: 'Admin'},
    {value: 'Meetings'}
  ];

  stepNumber = 0;

  private addEntry: boolean = true;

  constructor( public dialog: MatDialog, private timesheets: TimesheetsService, private datePipe: DatePipe, private session: SessionService, private router: Router ) { }

  ngOnInit() {
    this.currDate = new Date((new Date().getTime() - 0));

    var newCurrDate = this.datePipe.transform(this.currDate, 'yyyy-MM-dd');
    
    var newEntries;
    
    
    if (this.isContractor === true) {
      this.stepNumber = 1;
    } else {
      this.stepNumber = 4;
    }
  }

  onNewEntry(): void {
    this.editEntry = false;
    this.addEntry = !this.addEntry;

  }

  onSaveEntry(): void {
    console.log(this.entryCompanyName, this.entryCompanyName, this.entryActivity, this.duration, this.entryNotes)

    if( this.editEntry ) {
      console.log('editing time sheet');

      var editedEntryData = {
        timesheetId: this.editedEntry.id,
        timesheet: {
          date: this.editedEntry,
          minutes: this.editedEntry.minutes,
          description: this.editedEntry.description
        }
      }

      this.timesheets.editTimesheetEntry(editedEntryData)
      
    } else {
      var postData = {
        company: {
          name: this.entryCompanyName
        },
        timesheet: {
          date: this.currDate,
          minutes: this.duration,
          description: this.entryDescription,
          activiy: this.entryActivity
        }
      }

      this.timesheets.newTimesheetEntry(postData).subscribe(() => {
        console.log();
        
      }, error => {
        console.log(error)
      })
    }


  }

  onPrevDate(): void {
    this.currDate = new Date((this.currDate.getTime() - 86400000))

    var newEntries = this.timesheets.getDailyTimesheet(this.currDate)
  }

  onNextDate(): void {
    this.currDate = new Date((this.currDate.getTime() + 86400000))

    var newEntries = this.timesheets.getDailyTimesheet(this.currDate)
  }

  onEditEntry(timesheet :any, entry :any): void {
    this.editEntry = true;

    this.splitValue(timesheet.minutes);

    console.log(entry.company.name);
    this.entryActivity = timesheet.activity;
    this.entryDescription = timesheet.description;
    this.entryCompanyName = entry.company.name;
    this.addEntry = !this.addEntry;
    
    this.editedEntry = entry;

  }

  onDeleteEntry(entry:any): void {
    console.log(entry)
    console.log(entry.id);
    
    this.timesheets.deleteTimesheet(entry.id).subscribe(() => {
      console.log('deleted');
      
    }, error => {
      console.log(error);
      
    })
  }

  onValueChanges(value: number) {
    this.duration = value;
  }

  protected inputChanges(): void {
    this.combineValue();
    console.log(this.duration, this.entryHours, this.entryMinutes);
  }

  private combineValue(): void{
    this.duration = (this.entryHours * this.minutesPerHour) + this.entryMinutes;
   // this.valueChanges.emit(this.value); 
  }

  private splitValue(minutes :any): void {
    this.entryHours = Math.floor(minutes / this.minutesPerHour);
    this.entryMinutes = minutes % this.minutesPerHour;
  }

  onCancelEntry(): void {
    this.entryHours = 0;
    this.entryMinutes = 0;
    this.entryNotes = '';
    this.entryDescription = '';
    this.entryCompanyName = '';

    this.addEntry = !this.addEntry;
  }

  getReferenceData(): void {
    this.timesheets.getContractData().subscribe(() => {
      console.log();
    }, error => {
      console.log(error)
    })
  }

  rejectTimesheet(timesheet:any): void {
    var id = timesheet.id;
    var reason = "tesing dummy"
    this.timesheets.rejectTimesheet(id, reason).subscribe( data => {
      console.log(data);
      
    }, error => {
      console.log(error);
      
    })
  }

  acceptTimesheet(timesheet:any): void {
    var id = timesheet.id;
    this.timesheets.acceptTimesheet(id).subscribe( data => {
      console.log(data);
      
    }, error => {
      console.log(error);
      
    })
  }

  get isContractor(): boolean {
      return this.session.getUserType() == 'contractor';
  }

  get isClient(): boolean {
      return this.session.getUserType() == 'client';
  }

  setInfoStep(val:any): void {
    this.stepNumber = val;
  }
}
