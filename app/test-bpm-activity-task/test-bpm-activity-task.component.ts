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

    // task test vars
    task: BonitaTask
    passedTestBPMTaskSearchTasks: boolean = false
    passedTestBPMTaskGetTask: boolean = false

    // user task test vars
    userTask: BonitaTask
    passedTestBPMUserTaskGetUserTask: boolean = false

    userTaskContext: any
    passedTestBPMUserTaskGetUserTaskContext: boolean = false


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
        this.bpmActivitySearchActivities()

    }

    private bpmActivitySearchActivities() {
        let bonitaSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
        bonitaSearchParms.filters = ['name=Change Data Task']

        this.bpmActivityService.searchActivities(bonitaSearchParms)
            .subscribe(
                activities => {
                    this.activity = activities[0]
                    this.passedTestBPMActivitySearchActivities = true
                    // next test in chain (1)
                    this.bpmActivityGetActivity()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private bpmActivityGetActivity() {
        this.bpmActivityService.getActivity(this.activity.id)
            .subscribe(
                activity => {
                    this.activity = activity
                    this.passedTestBPMActivityGetActivity = true
                    // next test in chain (2)
                    this.bpmHumanTaskSearchHumanTasks()
                },
                errorResponse => this.errorResponse
            )
    }

    private bpmHumanTaskSearchHumanTasks() {
        let bonitaSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
        bonitaSearchParms.filters = ['name=Change Data Task']

        this.bpmHumanTaskService.searchHumanTasks(bonitaSearchParms)
            .subscribe(
                humanTasks => {
                    console.log(humanTasks)
                    this.humanTask = humanTasks[0]
                    this.passedTestBPMHumanTaskSearchHumanTasks = true
                    // next test in chain (3)
                    this.bpmHumanTaskGetHumanTask()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private bpmHumanTaskGetHumanTask() {
        this.bpmHumanTaskService.getHumanTask(this.humanTask.id)
            .subscribe(
                humanTask => {
                    this.humanTask = humanTask
                    this.passedTestBPMHumanTaskGetHumanTask = true
                    // next test in chain (4)
                    this.bpmTaskSearchTasks()
                },
                errorResponse => this.errorResponse
            )
    }

    private bpmTaskSearchTasks() {
        let bonitaSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
        bonitaSearchParms.filters = ['name=Change Data Task']

        this.bpmTaskService.searchTasks(bonitaSearchParms)
            .subscribe(
                tasks => {
                    console.log(tasks)
                    this.task = tasks[0]
                    this.passedTestBPMTaskSearchTasks = true
                    // next test in chain (3)
                    this.bpmTaskGetTask()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private bpmTaskGetTask() {
        this.bpmTaskService.getTask(this.task.id)
            .subscribe(
                task => {
                    this.task = task
                    this.passedTestBPMTaskGetTask = true
                    // next test in chain (4)
                    this.bpmUserTaskGetUserTask()
                },
                errorResponse => this.errorResponse
            )
    }

    private bpmUserTaskGetUserTask() {
        this.bpmUserTaskService.getUserTask(this.task.id)
            .subscribe(
                userTask => {
                    this.userTask = userTask
                    this.passedTestBPMUserTaskGetUserTask = true
                    // next test in chain (4)
                    this.bpmUserTaskGetUserTaskContext()
                },
                errorResponse => this.errorResponse
            )
    }

    private bpmUserTaskGetUserTaskContext() {
        this.bpmUserTaskService.getUserTaskContext(this.userTask.id)
            .subscribe(
                userTaskContext => {
                    this.userTaskContext = userTaskContext
                    this.passedTestBPMUserTaskGetUserTaskContext = true
                    // next test in chain (5)
                },
                errorResponse => this.errorResponse
            )
    }

}