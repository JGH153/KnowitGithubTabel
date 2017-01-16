import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { GithubApiLoaderService } from './github-api-loader.service';
import { GithubTableComponent } from './github-table/github-table.component';

@NgModule({
    declarations: [
        AppComponent,
        GithubTableComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        GithubApiLoaderService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
