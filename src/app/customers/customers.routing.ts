import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerManageComponent } from "./customer-manage/customer-manage.component";
import { CustomersListComponent } from "./customers-list/customers-list.component";

const routes: Routes = [

    {
        path: '',
        component: CustomersListComponent,
    },
    {
        path: 'new',
        component: CustomerManageComponent,
        data:{
            type:'new'
        }
    },
    {
        path: 'edit/:id',
        component: CustomerManageComponent,
        data:{
            type:'edit'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersRoutingModule {}
