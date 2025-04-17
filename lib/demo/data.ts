import { CategoriesType } from "../type/categoriesType";
import { ProductTypeResponse } from "../type/productType";
import { storeResponseType } from "../type/storeType";

export const demoStoreResponse: storeResponseType[] = [
    {
        vendor_id: 456,
        vendor_display_name: "Green Leaf Grocers",
        vendor_shop_name: "green‑leaf‑grocers",
        formatted_display_name: "Green Leaf Grocers – green‑leaf‑grocers",
        store_hide_email: "no",
        store_hide_phone: "no",
        store_hide_address: "no",
        store_hide_description: "no",
        store_hide_policy: "no",
        store_products_per_page: 20,
        vendor_email: "contact@greenleafgrocers.com",
        vendor_address: "42 Orchard Lane, Farmville",
        disable_vendor: "no",
        is_store_offline: "no",
        vendor_shop_logo: "https://source.unsplash.com/random/200x200?grocery,logo",
        vendor_banner_type: "image",
        vendor_banner: "https://source.unsplash.com/random/1200x300?grocery,vegetables",
        mobile_banner: "https://source.unsplash.com/random/600x200?grocery,fruits",
        vendor_list_banner_type: "image",
        vendor_list_banner: "https://source.unsplash.com/random/400x200?grocery,aisle",
        store_rating: 4.6,
        email_verified: "1",

        vendor_additional_info: [
            {
                type: "text",
                label: "Established",
                options: "",
                content: "2018",
                help_text: "Year the store was founded",
                name: "established_year",
                value: "2018"
            },
            {
                type: "select",
                label: "Delivery Area",
                options: "Local,Regional,National",
                content: "",
                help_text: "Where we deliver",
                name: "delivery_area",
                value: "Regional"
            },
            {
                type: "checkbox",
                label: "Organic Only",
                options: "",
                content: "",
                help_text: "Do we sell only organic produce?",
                name: "organic_only",
                value: "true"
            }
        ],

        vendor_description:
            "Green Leaf Grocers brings you the freshest organic fruits and vegetables straight from local farms. We’re committed to sustainable practices and community wellness.",

        vendor_policies: {
            shipping_policy_heading: "Shipping & Delivery",
            shipping_policy:
                "Free local delivery for orders over ₹1000. Standard courier rates apply nationwide.",
            refund_policy_heading: "Refunds",
            refund_policy:
                "If any item arrives damaged or spoiled, notify us within 24 hours for a full refund or replacement.",
            cancellation_policy_heading: "Order Cancellations",
            cancellation_policy:
                "You may cancel or modify your order up to 3 hours before scheduled delivery."
        },

        store_tab_headings: {
            products: "Our Produce",
            reviews: "What Customers Say",
            followers: "Followers"
        }
    },
    {
        vendor_id: 456,
        vendor_display_name: "Green Leaf Grocers",
        vendor_shop_name: "green‑leaf‑grocers",
        formatted_display_name: "Green Leaf Grocers – green‑leaf‑grocers",
        store_hide_email: "no",
        store_hide_phone: "no",
        store_hide_address: "no",
        store_hide_description: "no",
        store_hide_policy: "no",
        store_products_per_page: 20,
        vendor_email: "contact@greenleafgrocers.com",
        vendor_address: "42 Orchard Lane, Farmville",
        disable_vendor: "no",
        is_store_offline: "no",
        vendor_shop_logo: "https://source.unsplash.com/random/200x200?grocery,logo",
        vendor_banner_type: "image",
        vendor_banner: "https://source.unsplash.com/random/1200x300?grocery,vegetables",
        mobile_banner: "https://source.unsplash.com/random/600x200?grocery,fruits",
        vendor_list_banner_type: "image",
        vendor_list_banner: "https://source.unsplash.com/random/400x200?grocery,aisle",
        store_rating: 4.6,
        email_verified: "1",

        vendor_additional_info: [
            {
                type: "text",
                label: "Established",
                options: "",
                content: "2018",
                help_text: "Year the store was founded",
                name: "established_year",
                value: "2018"
            },
            {
                type: "select",
                label: "Delivery Area",
                options: "Local,Regional,National",
                content: "",
                help_text: "Where we deliver",
                name: "delivery_area",
                value: "Regional"
            },
            {
                type: "checkbox",
                label: "Organic Only",
                options: "",
                content: "",
                help_text: "Do we sell only organic produce?",
                name: "organic_only",
                value: "true"
            }
        ],

        vendor_description:
            "Green Leaf Grocers brings you the freshest organic fruits and vegetables straight from local farms. We’re committed to sustainable practices and community wellness.",

        vendor_policies: {
            shipping_policy_heading: "Shipping & Delivery",
            shipping_policy:
                "Free local delivery for orders over ₹1000. Standard courier rates apply nationwide.",
            refund_policy_heading: "Refunds",
            refund_policy:
                "If any item arrives damaged or spoiled, notify us within 24 hours for a full refund or replacement.",
            cancellation_policy_heading: "Order Cancellations",
            cancellation_policy:
                "You may cancel or modify your order up to 3 hours before scheduled delivery."
        },

        store_tab_headings: {
            products: "Our Produce",
            reviews: "What Customers Say",
            followers: "Followers"
        }
    }
];

export const demoProductResponse: ProductTypeResponse[] = [
    {
        id: 789,
        name: "Organic Honey Jar",
        slug: "organic-honey-jar",
        permalink: "https://api.example.com/products/organic-honey-jar",
        date_created: "2025-04-15T10:00:00",
        date_created_gmt: "2025-04-15T04:30:00",
        date_modified: "2025-04-16T12:15:00",
        date_modified_gmt: "2025-04-16T06:45:00",
        type: "simple",
        status: "publish",
        featured: false,
        catalog_visibility: "visible",
        description: "A 250g jar of raw, unfiltered organic honey sourced from sustainable apiaries.",
        short_description: "250g jar of raw organic honey.",
        sku: "HNY-ORG-001",
        price: "12.00",
        regular_price: "15.00",
        sale_price: "12.00",
        date_on_sale_from: "2025-04-10T00:00:00",
        date_on_sale_from_gmt: "2025-04-09T18:30:00",
        date_on_sale_to: "2025-04-20T23:59:59",
        date_on_sale_to_gmt: "2025-04-20T18:29:59",
        on_sale: true,
        purchasable: true,
        total_sales: 150,
        virtual: false,
        downloadable: false,
        downloads: [],
        download_limit: 0,
        download_expiry: 0,
        external_url: "",
        button_text: "",
        tax_status: "taxable",
        tax_class: "",
        manage_stock: true,
        stock_quantity: 34,
        backorders: "no",
        backorders_allowed: false,
        backordered: false,
        low_stock_amount: 5,
        sold_individually: false,
        weight: "0.25",
        dimensions: {
            length: "6",
            width: "6",
            height: "8"
        },
        shipping_required: true,
        shipping_taxable: true,
        shipping_class: "",
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: "4.9",
        rating_count: 124,
        upsell_ids: [790, 791],
        cross_sell_ids: [792],
        parent_id: 0,
        purchase_note: "",
        categories: [
            { id: 1, name: "Groceries", slug: "groceries" },
            { id: 2, name: "Organic", slug: "organic" }
        ],
        tags: [],
        images: [
            {
                id: 3001,
                date_created: "2025-04-15T10:05:00",
                date_created_gmt: "2025-04-15T04:35:00",
                date_modified: "2025-04-15T10:05:00",
                date_modified_gmt: "2025-04-15T04:35:00",
                src: "https://source.unsplash.com/random/800x800?honey,jar",
                name: "Organic Honey Jar",
                alt: "Jar of organic honey",
                thumbnail: "https://source.unsplash.com/random/150x150?honey,jar",
                medium: "https://source.unsplash.com/random/300x300?honey,jar",
                large: "https://source.unsplash.com/random/1024x1024?honey,jar",
                full: "https://source.unsplash.com/random/1600x1600?honey,jar"
            }
        ],
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        price_html: "<del>₹15.00</del> <ins>₹12.00</ins>",
        related_ids: [790, 793, 794],
        meta_data: [],
        stock_status: "instock",
        has_options: false,
        post_password: "",
        global_unique_id: "product_789",
        aioseo_notices: [],
        jetpack_sharing_enabled: false,
        brands: [],
        product_units: {
            weight_unit: "kg",
            dimension_unit: "cm"
        },
        wcfm_product_policy_data: {
            visible: true,
            shipping_policy_heading: "Shipping",
            shipping_policy: "Ships within 2–3 business days via DHL.",
            refund_policy_heading: "Refunds & Returns",
            refund_policy: "Contact us within 7 days for a full refund or replacement.",
            cancellation_policy_heading: "Cancellations",
            cancellation_policy: "Cancel up to 12 hours before dispatch.",
            tab_title: "Policies"
        },
        showAdditionalInfoTab: true,
        store: {
            vendor_id: 456,
            vendor_display_name: "Green Leaf Grocers",
            vendor_shop_name: "green‑leaf‑grocers",
            formatted_display_name: "Green Leaf Grocers – green‑leaf‑grocers",
            store_hide_email: "no",
            store_hide_phone: "no",
            store_hide_address: "no",
            store_hide_description: "no",
            store_hide_policy: "no",
            store_products_per_page: 20,
            vendor_email: "contact@greenleafgrocers.com",
            vendor_address: "42 Orchard Lane, Farmville",
            disable_vendor: "no",
            is_store_offline: "no",
            vendor_shop_logo: "https://source.unsplash.com/random/200x200?grocery,logo",
            vendor_banner_type: "image",
            vendor_banner: "https://source.unsplash.com/random/1200x300?grocery,vegetables",
            mobile_banner: "https://source.unsplash.com/random/600x200?grocery,fruits",
            vendor_list_banner_type: "image",
            vendor_list_banner: "https://source.unsplash.com/random/400x200?grocery,aisle",
            store_rating: 4.6,
            email_verified: "1",
            vendor_additional_info: [
                {
                    type: "text",
                    label: "Established",
                    options: "",
                    content: "2018",
                    help_text: "Year the store was founded",
                    name: "established_year",
                    value: "2018"
                }
            ],
            vendor_description:
                "Green Leaf Grocers brings you the freshest organic fruits and vegetables straight from local farms.",
            vendor_policies: {
                shipping_policy_heading: "Shipping & Delivery",
                shipping_policy:
                    "Free local delivery for orders over ₹1000. Standard courier rates apply nationwide.",
                refund_policy_heading: "Refunds",
                refund_policy:
                    "If any item arrives damaged or spoiled, notify us within 24 hours for a full refund or replacement.",
                cancellation_policy_heading: "Order Cancellations",
                cancellation_policy:
                    "You may cancel or modify your order up to 3 hours before scheduled delivery."
            },
            store_tab_headings: {
                products: "Our Produce",
                about: "About Us",
                policies: "Store Policies",
                reviews: "Customer Reviews",
                followers: "Followers"
            }
        },
        product_restirction_message: "",
        _links: {
            self: [
                { href: "https://api.example.com/products/789" }
            ],
            collection: [
                { href: "https://api.example.com/products" }
            ]
        }
    },
    {
        id: 789,
        name: "Organic Honey Jar",
        slug: "organic-honey-jar",
        permalink: "https://api.example.com/products/organic-honey-jar",
        date_created: "2025-04-15T10:00:00",
        date_created_gmt: "2025-04-15T04:30:00",
        date_modified: "2025-04-16T12:15:00",
        date_modified_gmt: "2025-04-16T06:45:00",
        type: "simple",
        status: "publish",
        featured: false,
        catalog_visibility: "visible",
        description: "A 250g jar of raw, unfiltered organic honey sourced from sustainable apiaries.",
        short_description: "250g jar of raw organic honey.",
        sku: "HNY-ORG-001",
        price: "12.00",
        regular_price: "15.00",
        sale_price: "12.00",
        date_on_sale_from: "2025-04-10T00:00:00",
        date_on_sale_from_gmt: "2025-04-09T18:30:00",
        date_on_sale_to: "2025-04-20T23:59:59",
        date_on_sale_to_gmt: "2025-04-20T18:29:59",
        on_sale: true,
        purchasable: true,
        total_sales: 150,
        virtual: false,
        downloadable: false,
        downloads: [],
        download_limit: 0,
        download_expiry: 0,
        external_url: "",
        button_text: "",
        tax_status: "taxable",
        tax_class: "",
        manage_stock: true,
        stock_quantity: 34,
        backorders: "no",
        backorders_allowed: false,
        backordered: false,
        low_stock_amount: 5,
        sold_individually: false,
        weight: "0.25",
        dimensions: {
            length: "6",
            width: "6",
            height: "8"
        },
        shipping_required: true,
        shipping_taxable: true,
        shipping_class: "",
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: "4.9",
        rating_count: 124,
        upsell_ids: [790, 791],
        cross_sell_ids: [792],
        parent_id: 0,
        purchase_note: "",
        categories: [
            { id: 1, name: "Groceries", slug: "groceries" },
            { id: 2, name: "Organic", slug: "organic" }
        ],
        tags: [],
        images: [
            {
                id: 3001,
                date_created: "2025-04-15T10:05:00",
                date_created_gmt: "2025-04-15T04:35:00",
                date_modified: "2025-04-15T10:05:00",
                date_modified_gmt: "2025-04-15T04:35:00",
                src: "https://source.unsplash.com/random/800x800?honey,jar",
                name: "Organic Honey Jar",
                alt: "Jar of organic honey",
                thumbnail: "https://source.unsplash.com/random/150x150?honey,jar",
                medium: "https://source.unsplash.com/random/300x300?honey,jar",
                large: "https://source.unsplash.com/random/1024x1024?honey,jar",
                full: "https://source.unsplash.com/random/1600x1600?honey,jar"
            }
        ],
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        price_html: "<del>₹15.00</del> <ins>₹12.00</ins>",
        related_ids: [790, 793, 794],
        meta_data: [],
        stock_status: "instock",
        has_options: false,
        post_password: "",
        global_unique_id: "product_789",
        aioseo_notices: [],
        jetpack_sharing_enabled: false,
        brands: [],
        product_units: {
            weight_unit: "kg",
            dimension_unit: "cm"
        },
        wcfm_product_policy_data: {
            visible: true,
            shipping_policy_heading: "Shipping",
            shipping_policy: "Ships within 2–3 business days via DHL.",
            refund_policy_heading: "Refunds & Returns",
            refund_policy: "Contact us within 7 days for a full refund or replacement.",
            cancellation_policy_heading: "Cancellations",
            cancellation_policy: "Cancel up to 12 hours before dispatch.",
            tab_title: "Policies"
        },
        showAdditionalInfoTab: true,
        store: {
            vendor_id: 456,
            vendor_display_name: "Green Leaf Grocers",
            vendor_shop_name: "green‑leaf‑grocers",
            formatted_display_name: "Green Leaf Grocers – green‑leaf‑grocers",
            store_hide_email: "no",
            store_hide_phone: "no",
            store_hide_address: "no",
            store_hide_description: "no",
            store_hide_policy: "no",
            store_products_per_page: 20,
            vendor_email: "contact@greenleafgrocers.com",
            vendor_address: "42 Orchard Lane, Farmville",
            disable_vendor: "no",
            is_store_offline: "no",
            vendor_shop_logo: "https://source.unsplash.com/random/200x200?grocery,logo",
            vendor_banner_type: "image",
            vendor_banner: "https://source.unsplash.com/random/1200x300?grocery,vegetables",
            mobile_banner: "https://source.unsplash.com/random/600x200?grocery,fruits",
            vendor_list_banner_type: "image",
            vendor_list_banner: "https://source.unsplash.com/random/400x200?grocery,aisle",
            store_rating: 4.6,
            email_verified: "1",
            vendor_additional_info: [
                {
                    type: "text",
                    label: "Established",
                    options: "",
                    content: "2018",
                    help_text: "Year the store was founded",
                    name: "established_year",
                    value: "2018"
                }
            ],
            vendor_description:
                "Green Leaf Grocers brings you the freshest organic fruits and vegetables straight from local farms.",
            vendor_policies: {
                shipping_policy_heading: "Shipping & Delivery",
                shipping_policy:
                    "Free local delivery for orders over ₹1000. Standard courier rates apply nationwide.",
                refund_policy_heading: "Refunds",
                refund_policy:
                    "If any item arrives damaged or spoiled, notify us within 24 hours for a full refund or replacement.",
                cancellation_policy_heading: "Order Cancellations",
                cancellation_policy:
                    "You may cancel or modify your order up to 3 hours before scheduled delivery."
            },
            store_tab_headings: {
                products: "Our Produce",
                about: "About Us",
                policies: "Store Policies",
                reviews: "Customer Reviews",
                followers: "Followers"
            }
        },
        product_restirction_message: "",
        _links: {
            self: [
                { href: "https://api.example.com/products/789" }
            ],
            collection: [
                { href: "https://api.example.com/products" }
            ]
        }
    }
]

export const demoCategory: CategoriesType[] = [
    {
        id: 101,
        name: "Organic Produce",
        slug: "organic-produce",
        parent: 0,
        description: "Fresh and certified organic fruits and vegetables.",
        display: "default",
        image: {
          id: 301,
          date_created: "2025-04-10T09:00:00",
          date_created_gmt: "2025-04-10T03:30:00",
          date_modified: "2025-04-10T09:00:00",
          date_modified_gmt: "2025-04-10T03:30:00",
          src: "https://source.unsplash.com/random/800x800?organic,produce",
          name: "Organic Produce",
          alt: "Assorted organic fruits and vegetables"
        },
        menu_order: 1,
        count: 150,
        _links: {
          self: [
            {
              herf: "https://api.example.com/categories/101",
              targetHints: {
                allow: ["GET"]
              }
            }
          ],
          collection: [
            {
              herf: "https://api.example.com/categories"
            }
          ],
          up: [
            {
              herf: "https://api.example.com/categories/0"
            }
          ]
        }
      },
      {
        id: 101,
        name: "Organic Produce",
        slug: "organic-produce",
        parent: 0,
        description: "Fresh and certified organic fruits and vegetables.",
        display: "default",
        image: {
          id: 301,
          date_created: "2025-04-10T09:00:00",
          date_created_gmt: "2025-04-10T03:30:00",
          date_modified: "2025-04-10T09:00:00",
          date_modified_gmt: "2025-04-10T03:30:00",
          src: "https://source.unsplash.com/random/800x800?organic,produce",
          name: "Organic Produce",
          alt: "Assorted organic fruits and vegetables"
        },
        menu_order: 1,
        count: 150,
        _links: {
          self: [
            {
              herf: "https://api.example.com/categories/101",
              targetHints: {
                allow: ["GET"]
              }
            }
          ],
          collection: [
            {
              herf: "https://api.example.com/categories"
            }
          ],
          up: [
            {
              herf: "https://api.example.com/categories/0"
            }
          ]
        }
      }
]
  