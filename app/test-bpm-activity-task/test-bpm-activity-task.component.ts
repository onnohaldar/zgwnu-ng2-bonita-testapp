import {Component, OnInit} from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, 
  BonitaBpmActivityService, BonitaActivity,
  BonitaBpmHumanTaskService, BonitaHumanTask, 
  BonitaBpmTaskService, BonitaTask, 
  BonitaBpmUserTaskService, BonitaUserTask
  } from '../zgwnu2/bonita'

@Component({
  moduleId: module.id,
  selector: 'test-bpm-activity-task',
  templateUrl: 'test-bpm-activity-task.component.html',
  styleUrls: [ 'test-bpm-activity-task.component.css' ],
})

export class TestBpmActivityTaskComponent implements OnInit {

    // generic bonita rest api test vars
    response: BonitaResponse
    errorResponse: BonitaErrorResponse

    // activity test vars
    activity: BonitaActivity
    passedTestBPMActivitySearchActivities: boolean = false
    passedTestBPMActivityGetActivity: boolean = false

    // human task test vars
    humanTask: BonitaHumanTask
    passedTestBPMHumanTaskSearchHumanTasks: boolean = false
    passedTestBPMHumanTaskGetHumanTask: boolean = false


    constructor(
        private bpmActivityService: BonitaBpmActivityService, 
        private bpmHumanTaskService: BonitaBpmHumanTaskService, 
        private bpmTaskService: BonitaBpmTaskService, 
        private bpmUserTaskService: BonitaBpmUserTaskService, 
    )
    {
    }

    ngOnInit():void {
        console.log('InitTestBpmActivityTaskComponent')

        // start testchain
        this.BPMActivitySearchActivities()

    }

    private BPMActivitySearchActivities() {
        let bonitaSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
        bonitaSearchParms.filters = ['name=Change Data Task']

        this.bpmActivityService.searchActivities(bonitaSearchParms)
            .subscribe(
                activity => {
                    this.activity = activity[0]
                    this.passedTestBPMActivitySearchActivities = true
                    // next test in chain (1)
                    this.BPMActivityGetActivity()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private BPMActivityGetActivity() {
        this.bpmActivityService.getActivity(this.activity.id)
            .subscribe(
                activity => {
                    this.activity = activity
                    this.passedTestBPMActivityGetActivity = true
                    // next test in chain (2)
                    this.BPMHumanTaskSearchHumanTasks()
                },
                errorResponse => this.errorResponse
            )
    }

    private BPMHumanTaskSearchHumanTasks() {
        let bonitaSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
        bonitaSearchParms.filters = ['name=Change Data Task']

        this.bpmHumanTaskService.searchHumanTasks(bonitaSearchParms)
            .subscribe(
                humanTask => {
                    this.humanTask = humanTask[0]
                    this.passedTestBPMHumanTaskSearchHumanTasks = true
                    // next test in chain (3)
                    this.BPMHumanTaskGetHumanTask()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private BPMHumanTaskGetHumanTask() {
        this.bpmHumanTaskService.getHumanTask(this.humanTask.id)
            .subscribe(
                humanTask => {
                    this.humanTask = humanTask
                    this.passedTestBPMHumanTaskGetHumanTask = true
                    // next test in chain (4)

                },
                errorResponse => this.errorResponse
            )
    }


}