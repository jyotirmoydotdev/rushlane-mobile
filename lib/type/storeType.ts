export type storeType = {
    id: string,
    name: string,
    show : {
        email : boolean,
        phone : boolean,
        address : boolean,
        description : boolean,
        policy: boolean,
    },
    emailVerified : boolean,
    email : string | null,
    address : string | null,
    description : string | null,
    banner : {
        type: string,
        url: string,
        mobileUrl : string, 
    } | null,
    logoUrl: string | null,
    rating : number,
    policies: {
        "shipping_policy_heading": string,
        "shipping_policy": string,
        "refund_policy_heading": string,
        "refund_policy": string,
        "cancellation_policy_heading": string,
        "cancellation_policy": string,
    } | null,
}

export interface VendorAdditionalInfo {
    type: string;
    label: string;
    options: string;
    content: string;
    help_text: string;
    name: string;
    value: string;
  }
  
  export interface VendorPolicies {
    shipping_policy_heading: string;
    shipping_policy: string;
    refund_policy_heading: string;
    refund_policy: string;
    cancellation_policy_heading: string;
    cancellation_policy: string;
  }
  
  export interface StoreTabHeadings {
    products: string;
    reviews: string;
    followers: string;
  }
  
  export interface storeResponseType {
    vendor_id: number;
    vendor_display_name: string;
    vendor_shop_name: string;
    formatted_display_name: string;
    store_hide_email: "yes" | "no";
    store_hide_phone: "yes" | "no";
    store_hide_address: "yes" | "no";
    store_hide_description: "yes" | "no";
    store_hide_policy: "yes" | "no";
    store_products_per_page: number;
    vendor_email: string;
    vendor_address: string;
    disable_vendor: "yes" | "no";
    is_store_offline: "yes" | "no";
    vendor_shop_logo: string;
    vendor_banner_type: string;
    vendor_banner: string;
    mobile_banner: string;
    vendor_list_banner_type: string;
    vendor_list_banner: string;
    store_rating: number;
    email_verified: "0" | "1";
    vendor_additional_info: VendorAdditionalInfo[];
    vendor_description: string;
    vendor_policies: VendorPolicies;
    store_tab_headings: StoreTabHeadings;
  }
  