import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomerListItem } from '../models/customer-list-item.interface';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {

  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router
  ) { }


  customersList$ = this.customerService.getCustomersList();


  goToNewCustomer(){
    this.router.navigate(['customers/new']);
  }

/**
 * Method to navigate into customer detail page
 * @param customer ICustomerListItem
 */
  goToDetail(customer: ICustomerListItem) {
    this.router.navigate(['customers/edit', customer.id]);
  }

}
