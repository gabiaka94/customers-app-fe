import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs"
import { ICustomerDetail } from "../models/customer-detail.interface";
import { ICustomerInvoicesListItem } from "../models/customer-invoices-list-item.interface";
import { ICustomerListItem } from "../models/customer-list-item.interface";


const BASE_URL = ' https://localhost:7222/api/';

@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(
        private readonly http: HttpClient
    ) { }



    getCustomersList(): Observable<ICustomerListItem[]> {
        return this.http.get<ICustomerListItem[]>(BASE_URL + 'customers')
    }

    getCustomerDetail(id: string): Observable<ICustomerDetail> {
        return this.http.get<ICustomerDetail>(BASE_URL + 'customers/' + id);
    }

    createCustomer(customer: Omit<ICustomerDetail,  "id | subscription">) {
        return this.http.post<ICustomerDetail>(BASE_URL + 'customers', {
            ...customer
        });
    }

    updateCustomer(id: string, customer: Omit<ICustomerDetail,  "id | subscription">) {
        return this.http.put<ICustomerDetail>(BASE_URL + 'customers/' + id, {
            ...customer
        });
    }

    getCustomerInvoicesList(id: string): Observable<ICustomerInvoicesListItem[]> {
        return this.http.get<ICustomerInvoicesListItem[]>(BASE_URL + 'invoices/customer/'+id)
    }
}