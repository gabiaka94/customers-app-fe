import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomersListComponent } from "./customers-list/customers-list.component";
import { CustomersRoutingModule } from "./customers.routing";
import { CustomerManageComponent } from './customer-manage/customer-manage.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CustomersRoutingModule,
        HttpClientModule
    ],
    declarations: [
        CustomersListComponent,
        CustomerManageComponent
    ],
})

export class CustomersModule {}