var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var GithubObjectDetailComponent = (function () {
    function GithubObjectDetailComponent() {
        this.exitDetailComponentEE = new EventEmitter();
        this.datapoints = [
            { "name": "full_name" },
            { "name": "description" },
            { "name": "fork" },
            { "name": "html_url" },
            { "name": "size" },
            { "name": "forks" },
            { "name": "open_issues" },
            { "name": "watchers" },
        ];
    }
    GithubObjectDetailComponent.prototype.ngOnInit = function () {
    };
    GithubObjectDetailComponent.prototype.goBack = function () {
        this.exitDetailComponentEE.emit(true);
    };
    return GithubObjectDetailComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], GithubObjectDetailComponent.prototype, "selectedObject", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], GithubObjectDetailComponent.prototype, "exitDetailComponentEE", void 0);
GithubObjectDetailComponent = __decorate([
    Component({
        selector: 'app-github-object-detail',
        templateUrl: './github-object-detail.component.html',
        styleUrls: ['./github-object-detail.component.css']
    }),
    __metadata("design:paramtypes", [])
], GithubObjectDetailComponent);
export { GithubObjectDetailComponent };
//# sourceMappingURL=../../../../src/app/github-object-detail/github-object-detail.component.js.map