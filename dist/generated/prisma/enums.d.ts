export declare const Role: {
    readonly CUSTOMER: "CUSTOMER";
    readonly RESTAURANT_OWNER: "RESTAURANT_OWNER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly PREPARING: "PREPARING";
    readonly READY: "READY";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
