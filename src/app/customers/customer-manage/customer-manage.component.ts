import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, concatMap, forkJoin, merge } from 'rxjs';
import { ICustomerInvoicesListItem } from '../models/customer-invoices-list-item.interface';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-manage',
  templateUrl: './customer-manage.component.html',
  styleUrls: ['./customer-manage.component.scss']
})
export class CustomerManageComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  isLoading = false;
  invoicesList$ = new BehaviorSubject<ICustomerInvoicesListItem[]>([]);
  subscriptionValue: string = "";
  isEditView: boolean | undefined;
  idCustomer = "";
  constructor(
    private readonly customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }



  ngOnInit(): void {

    this.idCustomer = this.route.snapshot.params['id'];
    this.isEditView = this.route.snapshot.data['type'] === 'edit';
    if (this.isEditView) {
      forkJoin({
        customer: this.customerService.getCustomerDetail(this.idCustomer),
        invoices: this.customerService.getCustomerInvoicesList(this.idCustomer)
      })
        .subscribe(value => {
          const customer = value.customer
          this.formGroup = new FormGroup({
            name: new FormControl(customer.name, Validators.required),
            address: new FormControl(customer.address, Validators.required),
            state: new FormControl(customer.state, Validators.required),
            country: new FormControl(customer.country, Validators.required),
          });

          this.subscriptionValue = customer.subscription;
          this.invoicesList$.next(value.invoices);
          this.isLoading = true;

        })
    } else {
      this.formGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
      });
      this.isLoading = true;
    }

  }

  /**
   * Method to return on customers list page
   */
  goToCustomersList() {
    this.router.navigate(['customers']);
  }

  /**
   * Method to update customer
   */
  manageCustomer() {
    const request = this.isEditView ? this.customerService.updateCustomer(this.idCustomer, this.formGroup.value) : this.customerService.createCustomer({ ...this.formGroup.value, subscription: 'active' });
    request.subscribe({
      next: (v) => alert(this.isEditView ? "Customer update succesfully." : "Customer created succesfully."),
      error: (e) => alert(e)
    })
  }
}
