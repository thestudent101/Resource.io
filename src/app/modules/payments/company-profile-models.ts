export interface LineItemType {
    description: string;
    code: string;

    /*BLUE_CONTRACTOR_HOURS("Blue Contractor hours", "BPCH001"),
    BLUE_APP_LITE_LICENCE_FEE("Blue App Lite Licence Fee", "BPLITE"),
    BLUE_APP_PLUS_LICENCE_FEE("Blue App Plus Licence Fee", "BPPLUS"),
    BLUE_APP_PREMIUM_LICENCE_FEE("Blue App Premium Licence Fee ", "BPPREMIUM");*/

}

export interface CompanyProfile {
    name: string;
    vatNumber: string;
    physicalAddress: string;
    postalAddress: string;
    peachId: string;
    blueSubscription: string; //LineItemType;
}

