import {Component, OnInit, Input } from '@angular/core'

import { BonitaResponse ,BonitaErrorResponse, BonitaSearchParms, BonitaConfigService, 
  BonitaBpmActivityService, BonitaActivity,
  BonitaBpmHumanTaskService, BonitaHumanTask, 
  BonitaBpmTaskService, BonitaTask, 
  BonitaBpmUserTaskService, BonitaUserTask
  } from '../zgwnu2/bonita'

import { TestCase } from '../test/test-case'
import { UserTaskContract } from './user-task-contract'

@Component({
  moduleId: module.id,
  selector: 'test-bpm-activity-task',
  templateUrl: 'test-bpm-activity-task.component.html',
  styleUrls: [ 'test-bpm-activity-task.component.css' ],
})

export class TestBpmActivityTaskComponent implements OnInit {
    @Input() testCase: TestCase

    // Generic Bonita Rest Api test vars
    response: BonitaResponse
    errorResponse: BonitaErrorResponse

    // Generic Activity and Task test vars
    testTaskName: string = 'User Task'

    // Activity test vars
    activity: BonitaActivity
    passedTest_BpmActivity_searchActivities: boolean = false
    passedTest_BpmActivity_getActivity: boolean = false

    // Human Task test vars
    humanTask: BonitaHumanTask
    passedTest_BpmHumanTask_searchHumanTasks: boolean = false
    passedTest_BpmHumanTask_getHumanTask: boolean = false

    // Task test vars
    task: BonitaTask
    passedTest_BpmTask_searchTasks: boolean = false
    passedTest_BpmTask_getTask: boolean = false

    // User Task test vars
    userTask: BonitaUserTask
    passedTest_BpmUserTask_getUserTask: boolean = false

    userTaskContext: any
    passedTest_BpmUserTask_getUserTaskContext: boolean = false

    assignUserName: string
    assignUserTaskResponse: BonitaResponse
    passedTest_BpmUserTask_assignUserTask: boolean = false

    userTaskContract: UserTaskContract = new UserTaskContract('User Task Input')
    executeUserTaskResponse: BonitaResponse
    passedTest_BpmUserTask_executeUserTask: boolean = false

    constructor(
        private bpmActivityService: BonitaBpmActivityService, 
        private bpmHumanTaskService: BonitaBpmHumanTaskService, 
        private bpmTaskService: BonitaBpmTaskService, 
        private bpmUserTaskService: BonitaBpmUserTaskService, 
        private configService: BonitaConfigService, 
    )
    {
    }

    ngOnInit():void {
        console.log('InitTestBpmActivityTaskComponent')

        // start testchain
        this.test_BpmActivity_searchActivities()
    }

    private test_BpmActivity_searchActivities() {
        let testSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
        testSearchParms.filters = [
            'name=' + this.testTaskName,
            'parentCaseId=' + this.testCase.caseId
            ]

        this.bpmActivityService.searchActivities(testSearchParms)
            .subscribe(
                activities => {
                    this.activity = activities[0]
                    this.passedTest_BpmActivity_searchActivities = true
                    // next test in chain (1)
                    this.test_BpmActivity_getActivity()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private test_BpmActivity_getActivity() {
        this.bpmActivityService.getActivity(this.activity.id)
            .subscribe(
                activity => {
                    this.activity = activity
                    this.passedTest_BpmActivity_getActivity = true
                    // next test in chain (2)
                    this.test_BpmHumanTask_searchHumanTasks()
                },
                errorResponse => this.errorResponse
            )
    }

    private test_BpmHumanTask_searchHumanTasks() {
        let testSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
        testSearchParms.filters = [
            'name=' + this.testTaskName,
            ]

        this.bpmHumanTaskService.searchHumanTasks(testSearchParms)
            .subscribe(
                humanTasks => {
                    console.log(humanTasks)
                    this.humanTask = humanTasks[0]
                    this.passedTest_BpmHumanTask_searchHumanTasks = true
                    // next test in chain (3)
                    this.test_BpmHumanTask_getHumanTask()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private test_BpmHumanTask_getHumanTask() {
        this.bpmHumanTaskService.getHumanTask(this.humanTask.id)
            .subscribe(
                humanTask => {
                    this.humanTask = humanTask
                    this.passedTest_BpmHumanTask_getHumanTask = true
                    // next test in chain (4)
                    this.test_BpmTask_searchTasks()
                },
                errorResponse => this.errorResponse
            )
    }

    private test_BpmTask_searchTasks() {
        let testSearchParms: BonitaSearchParms = new BonitaSearchParms(0, 1)
        testSearchParms.filters = [
            'name=' + this.testTaskName,
            'parentCaseId=' + this.testCase.caseId
            ]


        this.bpmTaskService.searchTasks(testSearchParms)
            .subscribe(
                tasks => {
                    console.log(tasks)
                    this.task = tasks[0]
                    this.passedTest_BpmTask_searchTasks = true
                    // next test in chain (3)
                    this.test_BpmTask_getTask()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private test_BpmTask_getTask() {
        this.bpmTaskService.getTask(this.task.id)
            .subscribe(
                task => {
                    this.task = task
                    this.passedTest_BpmTask_getTask = true
                    // next test in chain (4)
                    this.test_BpmUserTaskGetUserTask()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private test_BpmUserTaskGetUserTask() {
        this.bpmUserTaskService.getUserTask(this.task.id)
            .subscribe(
                userTask => {
                    this.userTask = userTask
                    this.passedTest_BpmUserTask_getUserTask = true
                    // next test in chain (4)
                    this.test_BpmUserTask_getUserTaskContext()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private test_BpmUserTask_getUserTaskContext() {
        this.bpmUserTaskService.getUserTaskContext(this.userTask.id)
            .subscribe(
                userTaskContext => {
                    this.userTaskContext = userTaskContext
                    this.passedTest_BpmUserTask_getUserTaskContext = true
                    // next test in chain (5)
                    this.test_BpmUserTask_assignUserTask()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private test_BpmUserTask_assignUserTask() {
        this.bpmUserTaskService.assignUserTask(this.userTask.id, this.configService.session.user_id)
            .subscribe(
                response => {
                    this.assignUserTaskResponse = response
                    this.assignUserName = this.configService.session.user_name
                    this.passedTest_BpmUserTask_assignUserTask = true
                    // next test in chain (6)
                    this.test_BpmUserTask_executeUserTask()
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

    private test_BpmUserTask_executeUserTask() {
        this.bpmUserTaskService.executeUserTask(this.userTask.id, this.userTaskContract)
            .subscribe(
                response => {
                    this.executeUserTaskResponse = response
                    this.passedTest_BpmUserTask_executeUserTask = true
                    // next test in chain (6)
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

}