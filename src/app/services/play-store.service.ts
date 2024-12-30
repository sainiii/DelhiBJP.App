import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAPProduct, InAppPurchase2 } from "@awesome-cordova-plugins/in-app-purchase-2/ngx";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: "root"
})
export class PlayStoreService {
    private productIDs = [
        '3cdc3c8855884e6baca90150a79c3bdd',
        'b3e2be946ebf4746961e0dadf06fb3ed',
        'eb4ddd54654b4c4aae6c8a8957aadc1a',
        '77cc7b889fc941fd98f4046705f95f56', // Silver
        '133911e2bfa5489d9e84a03e78003267', // Gold
        'a95b239c66d347549fddf426a904dd54'  // Platinum
    ];

    constructor(private store: InAppPurchase2,
        private httpService: HttpService,
        private router: Router) { }

    public async getProduct(productID: string): Promise<IAPProduct> {
        return await this.store.get(productID);
    }

    setupStore() {
        //this.store.verbosity = this.store.DEBUG;

        // Run some code only when the store is ready to be used
        this.store.ready(() => {
            console.log('Store is ready');
            console.log('Products: ' + JSON.stringify(this.store.products));
        });

        this.productIDs.forEach(productId => {
            this.store.register({
                id: productId,
                type: this.store.PAID_SUBSCRIPTION,
            });
            this.registerHandlersForPurchase(productId);
        });

        this.store.refresh();
    }

    registerHandlersForPurchase(productId) {
        // Ionic In App Purchase Custom Validator
        this.store.validator = (product: IAPProduct, callback) => {
            let expired = false;

            if (expired) {
                callback(false, { code: this.store.PURCHASE_EXPIRED });
            } else {
                callback(true, {});
            }
        }

        let self = this.store;
        this.store.when(productId).updated((product) => {
            console.log(product);
            if (product.loaded && product.valid && product.state === self.APPROVED && product.transaction != null) {
                console.log('Purchase Successful');
                this.purchaseSuccessful(JSON.stringify(product), sessionStorage.getItem('OrderID'));
                product.finish();
            }
        });
        this.store.when(productId).registered((product: IAPProduct) => {
            console.log(product);
            //alert(` owned ${product.owned}`);
            //product.finish();
        });
        this.store.when(productId).owned((product: IAPProduct) => {
            console.log(product);
            //alert(` owned ${product.owned}`);
            //product.finish();
        });
        this.store.when(productId).approved((product: IAPProduct) => {
            console.log(product);
            console.log(product.transaction);
            //alert('approved');
            product.verify();
        });
        this.store.when(productId).refunded((product: IAPProduct) => {
            console.log(product);
            //alert('refunded');
            //product.finish();
        });
        // User closed the native purchase dialog
        this.store.when(productId).cancelled((product) => {
            console.log(product);
            console.error('Purchase was Cancelled');
            //product.finish();
        });
        this.store.when(productId).expired((product: IAPProduct) => {
            alert('expired');
            //product.finish();
        });
        // Track all store errors
        this.store.error((err) => {
            console.error('Store Error ' + JSON.stringify(err));
        });
    }

    order(productId, user) {
        this.store.order(productId, { developerPayload: JSON.stringify(user) }).then((p) => {
            console.log(p);
            if (p.transaction && p.owned) {
                console.log('Purchase Succesful' + JSON.stringify(p));
            }
        }).catch((e) => {
            console.log('Error Ordering From Store' + e);
            this.router.navigate(['/']);
        });
    }

    purchaseSuccessful(transaction, orderid) {
        this.httpService.post('/api/MapSubscriptionUser/UpdateOrderPlaystore', { orderId: orderid || sessionStorage.getItem('OrderID'), status: "Success", data: transaction }).subscribe(
            (x: any) => {
                if (x.Message === "Success") {
                    if(orderid) {
                        this.router.navigate(['/paymentstatus/' + orderid])
                    }
                }
                else {
                    console.log(x.Message);
                }
            }, (error: any) => {
                console.log(error);
            });
    }
}