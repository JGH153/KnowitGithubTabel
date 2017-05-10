var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { GithubApiLoaderService } from './../github-api-loader.service';
import 'rxjs/Rx';
import { LocalStorageService } from './../local-storage.service';
var GithubTableComponent = (function () {
    function GithubTableComponent(_GithubDataLoaderService, _localStorageService) {
        this._GithubDataLoaderService = _GithubDataLoaderService;
        this._localStorageService = _localStorageService;
        this.title = 'Github API';
        this.githubDataLoaded = false;
        this.sortByColumn = "name";
        this.sortAsc = true;
        this.sortByString = true;
        this.pageNumber = 0;
        this.totalElements = 0;
        this.elementsPrPage = 20;
        this.elementsTotal = 0;
        this.elementsTotalFiltered = 0;
        this.subElementIsSelected = false;
        this.inputFilterValue = "";
        this.tableColums = [
            { "name": 'id', "isString": false },
            { "name": 'name', "isString": true },
            { "name": 'description', "isString": true },
            { "name": 'url', "isString": true },
            { "name": 'stargazers_count', "isString": false },
        ];
    }
    GithubTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._GithubDataLoaderService.loadData()
            .subscribe(function (data) {
            _this.onGithubDataLoaded(data);
        }, function (error) { return console.error("_GithubDataLoaderService ERROR! ", error); });
    };
    GithubTableComponent.prototype.getLocalStorageValues = function () {
        if (this._localStorageService.get("GithubTable_SettingsSet") == "true") {
            this.sortByColumn = this._localStorageService.get("GithubTable_sortByColumn");
            this.sortAsc = (this._localStorageService.get("GithubTable_sortAsc") === 'true');
            this.sortByString = (this._localStorageService.get("GithubTable_sortByString") === 'true');
            this.inputFilterValue = this._localStorageService.get("GithubTable_inputFilterValue");
            this.filterArrayData();
            this.sortArrayData();
            this.pageNumber = parseInt(this._localStorageService.get("GithubTable_pageNumber"));
            console.log("LOADED FROM LOCAL STORAGE: ");
        }
    };
    GithubTableComponent.prototype.setLocalStorageValues = function () {
        this._localStorageService.set("GithubTable_SettingsSet", "true");
        this._localStorageService.set("GithubTable_sortByColumn", this.sortByColumn);
        this._localStorageService.set("GithubTable_sortAsc", this.sortAsc.toString());
        this._localStorageService.set("GithubTable_sortByString", this.sortByString.toString());
        this._localStorageService.set("GithubTable_pageNumber", this.pageNumber.toString());
        this._localStorageService.set("GithubTable_inputFilterValue", this.inputFilterValue);
    };
    GithubTableComponent.prototype.reload = function () {
        localStorage.clear();
        location.reload();
    };
    GithubTableComponent.prototype.selectedTableRow = function (subObjectId) {
        for (var i = 0; i < this.githubData.length; i++) {
            if (this.githubData[i].id == subObjectId) {
                this.selectedSubElement = this.githubData[i];
                this.subElementIsSelected = true;
                this.setLocalStorageValues();
                return;
            }
        }
    };
    GithubTableComponent.prototype.selectedSubElementCompleteEvent = function (event) {
        if (event == true) {
            this.subElementIsSelected = false;
            this.selectedSubElement = null;
        }
    };
    GithubTableComponent.prototype.newFilterValue = function (newValue) {
        this.inputFilterValue = newValue;
        this.filterArrayData();
        this.sortArrayData();
        this.setLocalStorageValues();
    };
    GithubTableComponent.prototype.onGithubDataLoaded = function (data) {
        this.githubData = data.items;
        this.elementsTotal = this.githubData.length;
        this.filterArrayData();
        this.sortArrayData();
        this.githubDataLoaded = true;
        this.getLocalStorageValues();
    };
    GithubTableComponent.prototype.filterArrayData = function () {
        var tempSubArray = new Array();
        for (var i = 0; i < this.githubData.length; i++) {
            if (this.inputFilterValue.length == 0 || this.githubData[i].name.includes(this.inputFilterValue)) {
                tempSubArray.push(this.githubData[i]);
            }
        }
        this.pageNumber = 0;
        this.elementsTotalFiltered = tempSubArray.length;
        this.githunDataFilterd = tempSubArray.slice();
    };
    GithubTableComponent.prototype.setSortByColumn = function (newColumnName, isString) {
        if (this.sortByColumn == newColumnName) {
            this.sortAsc = !this.sortAsc;
        }
        else {
            this.sortByColumn = newColumnName;
            this.sortAsc = true;
        }
        this.sortByString = isString;
        this.pageNumber = 0;
        this.sortArrayData();
        this.setLocalStorageValues();
    };
    GithubTableComponent.prototype.sortArrayData = function () {
        var _this = this;
        var tempSubArray = this.githunDataFilterd.slice();
        tempSubArray.sort(function (a, b) {
            if (_this.sortByString) {
                return a[_this.sortByColumn].localeCompare(b[_this.sortByColumn]);
            }
            else {
                return a[_this.sortByColumn] - b[_this.sortByColumn];
            }
        });
        if (!this.sortAsc) {
            tempSubArray.reverse();
        }
        this.githubDataSorted = tempSubArray.slice();
    };
    GithubTableComponent.prototype.getTableData = function () {
        if (!String.prototype.includes) {
            console.error("String.prototype.includes NOT supported ES6");
        }
        var returnSubArray = new Array();
        for (var i = 0; i < this.elementsPrPage; i++) {
            var index = i + (this.pageNumber * this.elementsPrPage);
            if (index >= this.githubDataSorted.length) {
                break;
            }
            returnSubArray.push(this.githubDataSorted[index]);
        }
        return returnSubArray;
    };
    GithubTableComponent.prototype.getElementOffset = function () {
        return this.pageNumber * this.elementsPrPage;
    };
    GithubTableComponent.prototype.prevPage = function () {
        if (this.isPrevPage()) {
            this.pageNumber--;
        }
        this.setLocalStorageValues();
    };
    GithubTableComponent.prototype.isPrevPage = function () {
        if (this.pageNumber == 0) {
            return false;
        }
        else {
            return true;
        }
    };
    GithubTableComponent.prototype.isNextPage = function () {
        if ((this.pageNumber + 1) * this.elementsPrPage >= this.elementsTotalFiltered) {
            return false;
        }
        else {
            return true;
        }
    };
    GithubTableComponent.prototype.nextPage = function () {
        if (this.isNextPage()) {
            this.pageNumber++;
        }
        this.setLocalStorageValues();
    };
    GithubTableComponent.prototype.isSortingByAsc = function (columnName) {
        return this.sortByColumn == columnName && this.sortAsc;
    };
    GithubTableComponent.prototype.isSortingByDesc = function (columnName) {
        return this.sortByColumn == columnName && !this.sortAsc;
    };
    return GithubTableComponent;
}());
GithubTableComponent = __decorate([
    Component({
        selector: 'app-github-table',
        templateUrl: './github-table.component.html',
        styleUrls: ['./github-table.component.css']
    }),
    __metadata("design:paramtypes", [GithubApiLoaderService,
        LocalStorageService])
], GithubTableComponent);
export { GithubTableComponent };
//# sourceMappingURL=../../../../src/app/github-table/github-table.component.js.map