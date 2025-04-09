export interface ProductType {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from: null | string;
    date_on_sale_from_gmt: null | string;
    date_on_sale_to: null | string;
    date_on_sale_to_gmt: null | string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: null | number;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    low_stock_amount: null | number;
    sold_individually: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    tags: any[];
    images: {
        id: number;
        date_created: string;
        date_created_gmt: string;
        date_modified: string;
        date_modified_gmt: string;
        src: string;
        name: string;
        alt: string;
        [key: string]: string | number; // For all the image size variations
    }[];
    attributes: any[];
    default_attributes: any[];
    variations: any[];
    grouped_products: any[];
    menu_order: number;
    price_html: string;
    related_ids: number[];
    meta_data: {
        id: number;
        key: string;
        value: any;
    }[];
    stock_status: string;
    has_options: boolean;
    post_password: string;
    global_unique_id: string;
    aioseo_notices: any[];
    jetpack_sharing_enabled: boolean;
    brands: any[];
    product_units: {
        weight_unit: string;
        dimension_unit: string;
    };
    wcfm_product_policy_data: {
        visible: boolean;
        shipping_policy: string;
        shipping_policy_heading: string;
        refund_policy: string;
        refund_policy_heading: string;
        cancellation_policy: string;
        cancellation_policy_heading: string;
        tab_title: string;
    };
    showAdditionalInfoTab: boolean;
    store: {
        vendor_id: number;
        vendor_display_name: string;
        vendor_shop_name: string;
        formatted_display_name: string;
        store_hide_email: string;
        store_hide_phone: string;
        store_hide_address: string;
        store_hide_description: string;
        store_hide_policy: string;
        store_products_per_page: number;
        vendor_email: string;
        vendor_address: string;
        disable_vendor: string;
        is_store_offline: string;
        vendor_shop_logo: string;
        vendor_banner_type: string;
        vendor_banner: string;
        mobile_banner: string;
        vendor_list_banner_type: string;
        vendor_list_banner: string;
        store_rating: string;
        email_verified: string;
        vendor_additional_info: {
            type: string;
            label: string;
            options: string;
            content: string;
            help_text: string;
            name: string;
            value: string;
        }[];
        vendor_description: string;
        vendor_policies: {
            shipping_policy_heading: string;
            shipping_policy: string;
            refund_policy_heading: string;
            refund_policy: string;
            cancellation_policy_heading: string;
            cancellation_policy: string;
        };
        store_tab_headings: {
            products: string;
            about: string;
            policies: string;
            reviews: string;
            followers: string;
        };
    };
    product_restirction_message: string;
    _links: {
        self: {
            href: string;
            targetHints?: {
                allow: string[];
            };
        }[];
        collection: {
            href: string;
        }[];
    };
}