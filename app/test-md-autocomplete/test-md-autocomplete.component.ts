import { Component, OnInit, Input } from '@angular/core'
import {FormControl} from '@angular/forms';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/startWith';

import { TestCase } from '../test/test-case'

@Component({
  moduleId: module.id,
  selector: 'test-md-autocomplete',
  templateUrl: 'test-md-autocomplete.component.html',
  styleUrls: [ 'test-md-autocomplete.component.css' ], 
  providers: [  

  ]
})

export class TestMdAutocompleteComponent implements OnInit {
  @Input() testCase: TestCase
  stateCtrl: FormControl;
  filteredStates: any;

  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  constructor() {
    this.stateCtrl = new FormControl()
    console.log(this.stateCtrl)
    this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name))
    console.log(this.filteredStates)
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gi').test(s)) : this.states
  }

  ngOnInit() {
    console.log('Init TestMdAutocompleteComponent')

  }

}