import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-github-object-detail',
    templateUrl: './github-object-detail.component.html',
    styleUrls: ['./github-object-detail.component.css']
})
export class GithubObjectDetailComponent implements OnInit {

    @Input() selectedObject;
    @Output() exitDetailComponentEE = new EventEmitter<boolean>();

    datapoints = [
        {"name": "full_name"},
        {"name": "description"},
        {"name": "fork"},
        {"name": "html_url"},
        {"name": "size"},
        {"name": "forks"},
        {"name": "open_issues"},
        {"name": "watchers"},
    ]

    constructor() { }

    ngOnInit() {



    }

    goBack(){

        this.exitDetailComponentEE.emit(true);

    }

}
