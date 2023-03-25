import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerModule } from "./shared/components/spinner/spinner.module";
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        SpinnerModule,
        FormsModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true
    }]
})
export class AppModule { }
