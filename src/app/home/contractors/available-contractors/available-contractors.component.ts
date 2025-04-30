import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-contractors',
  templateUrl: './available-contractors.component.html',
  styleUrls: ['./available-contractors.component.css']
})
export class AvailableContractorsComponent implements OnInit {
  searchText!:any;

  contractorProfiles = [
    {
      id: 'BLUE0001',
      title: 'Senior BI Developer',
      qualification: 'Diploma in IT Software Development',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      certificates: [
        { description:'power bi' },
        { description: 'aws solutions architect' },
        { description: 'cognos' }], 
      skills: [
        { description:'c#' },
        { description: 'java' }
      ],
      image: 'https://randomuser.me/api/portraits/lego/1.jpg'
    },
    {
      id: 'BLUE0003',
      title: 'Junior Back-End Developer',
      qualification: 'Bsc Computer Science',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      certificates: [
        { description:'power bi' },
        { description: 'aws solutions architect' },
        { description: 'cognos' }], 
      skills: [
        { description:'c#' },
        { description: 'java' },
        { description: 'javaScript' }
      ],
      image: 'https://randomuser.me/api/portraits/lego/1.jpg'
    },
    {
      id: 'BLUE0002',
      title: 'Intermediate UX/UI Developer',
      qualification: 'Bsc Honours Computer Science',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      certificates: [
        { description:'power bi' },
        { description: 'aws solutions architect' },
        { description: 'cognos' }], 
      skills: [
        { description:'Angular' },
        { description: 'java' },
        { description: 'javaScript' }
      ],
      image: 'https://randomuser.me/api/portraits/lego/1.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
