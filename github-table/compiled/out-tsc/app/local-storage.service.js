var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var LocalStorageService = (function () {
    function LocalStorageService() {
        if (!localStorage || !sessionStorage) {
            throw new Error('Local Storage not supported!');
        }
        this.localStorage = localStorage;
    }
    LocalStorageService.prototype.set = function (key, value) {
        this.localStorage[key] = value;
    };
    LocalStorageService.prototype.get = function (key) {
        return this.localStorage[key];
    };
    LocalStorageService.prototype.setObject = function (key, value) {
        this.localStorage[key] = JSON.stringify(value);
    };
    LocalStorageService.prototype.getObject = function (key) {
        return JSON.parse(this.localStorage[key] || '{}');
    };
    LocalStorageService.prototype.remove = function (key) {
        this.localStorage.removeItem(key);
    };
    return LocalStorageService;
}());
LocalStorageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], LocalStorageService);
export { LocalStorageService };
//# sourceMappingURL=../../../src/app/local-storage.service.js.map