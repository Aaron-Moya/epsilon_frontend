import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 

@NgModule({
    exports: [MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatSidenavModule, MatExpansionModule,
                MatFormFieldModule, MatRadioModule, MatInputModule, MatSelectModule, MatMenuModule, 
                MatProgressSpinnerModule, MatPaginatorModule]
})

export class MaterialModule { }