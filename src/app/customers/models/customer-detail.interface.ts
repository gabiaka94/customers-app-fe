import { SubscriptionType } from "./subscription.type";

export interface ICustomerDetail {
    id: number;
    name: string;
    address: string;
    state: string;
    country: string;
    subscription: SubscriptionType;
}