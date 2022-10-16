import { SubscriptionType } from "./subscription.type";

export interface ICustomerListItem {
    id: number,
    name: string;
    address: string;
    subscription: SubscriptionType;
    invoicesCount: number;
}