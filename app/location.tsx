import HalfScreenModal from '@/components/modelComp';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { blurhash } from '@/constants/blurHash';
import { ProductType } from '@/lib/type/productType';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Bookmark, ChefHat, Circle, Save, Share, SquareSquare, Star, Triangle, Vegan } from 'lucide-react-native';
import React, { useState } from 'react'
import he from 'he';
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox"
import { CheckIcon } from "@/components/ui/icon"

import { View, Text, FlatList } from 'react-native';

export default function Location() {
  const productItems: ProductType[] = [
    {
      "id": 14262,
      "name": "Apple Shake",
      "slug": "apple-shake-2",
      "permalink": "https://rushlane.net/product/apple-shake-2/",
      "date_created": "2024-07-22T16:08:32",
      "date_created_gmt": "2024-07-22T10:38:32",
      "date_modified": "2025-02-01T15:38:02",
      "date_modified_gmt": "2025-02-01T10:08:02",
      "type": "simple",
      "status": "publish",
      "featured": false,
      "catalog_visibility": "visible",
      "description": "<p>Apple Shake is a nutritious and delicious beverage made by blending fresh apples</p>\n",
      "short_description": "",
      "sku": "",
      "price": "175",
      "regular_price": "175",
      "sale_price": "",
      "date_on_sale_from": null,
      "date_on_sale_from_gmt": null,
      "date_on_sale_to": null,
      "date_on_sale_to_gmt": null,
      "on_sale": false,
      "purchasable": true,
      "total_sales": 35,
      "virtual": false,
      "downloadable": false,
      "downloads": [],
      "download_limit": -1,
      "download_expiry": -1,
      "external_url": "",
      "button_text": "",
      "tax_status": "none",
      "tax_class": "zero-rate",
      "manage_stock": false,
      "stock_quantity": null,
      "backorders": "no",
      "backorders_allowed": false,
      "backordered": false,
      "low_stock_amount": null,
      "sold_individually": false,
      "weight": "",
      "dimensions": {
        "length": "",
        "width": "",
        "height": ""
      },
      "shipping_required": true,
      "shipping_taxable": false,
      "shipping_class": "",
      "shipping_class_id": 0,
      "reviews_allowed": true,
      "average_rating": "0.00",
      "rating_count": 0,
      "upsell_ids": [],
      "cross_sell_ids": [],
      "parent_id": 0,
      "purchase_note": "",
      "categories": [
        {
          "id": 377,
          "name": "0 - 200",
          "slug": "100-200"
        },
        {
          "id": 450,
          "name": "CDC Food (Menu)",
          "slug": "cdc-food-menu"
        },
        {
          "id": 110,
          "name": "Menu",
          "slug": "menu"
        },
        {
          "id": 369,
          "name": "Shake",
          "slug": "shake"
        },
        {
          "id": 355,
          "name": "Veg",
          "slug": "veg"
        }
      ],
      "tags": [],
      "images": [
        {
          "id": 8207,
          "date_created": "2024-06-05T13:56:35",
          "date_created_gmt": "2024-06-05T08:26:35",
          "date_modified": "2024-06-05T13:56:35",
          "date_modified_gmt": "2024-06-05T08:26:35",
          "src": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?fit=1615%2C1992&ssl=1",
          "name": "resize apple shake",
          "alt": "",
          "1536x1536": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?fit=1245%2C1536&ssl=1",
          "2048x2048": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?fit=1615%2C1992&ssl=1",
          "post-thumbnail": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?resize=360%2C187&ssl=1",
          "greenmart_photo_reviews_thumbnail_image": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?resize=100%2C100&ssl=1",
          "woocommerce_thumbnail": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?resize=291%2C291&ssl=1",
          "woocommerce_single": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?fit=570%2C703&ssl=1",
          "woocommerce_gallery_thumbnail": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?resize=160%2C160&ssl=1",
          "wcpr-photo-reviews": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?fit=405%2C500&ssl=1",
          "variation_swatches_image_size": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?resize=50%2C50&ssl=1",
          "variation_swatches_tooltip_size": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?resize=100%2C100&ssl=1",
          "woosq": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?resize=460%2C460&ssl=1",
          "quick_view_image_size": "https://i0.wp.com/rushlane.net/wp-content/uploads/2024/06/resize-apple-shake.jpg?resize=450%2C600&ssl=1"
        }
      ],
      "attributes": [],
      "default_attributes": [],
      "variations": [],
      "grouped_products": [],
      "menu_order": 0,
      "price_html": "<span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#8377;</span>175.00</bdi></span>",
      "related_ids": [
        13706,
        13755,
        13823,
        13845,
        13698
      ],
      "meta_data": [
        {
          "id": 504577,
          "key": "_wp_page_template",
          "value": "default"
        },
        {
          "id": 504578,
          "key": "_subtitle",
          "value": ""
        },
        {
          "id": 504579,
          "key": "_video_url",
          "value": ""
        },
        {
          "id": 504580,
          "key": "_greenmart_min_max_quantities_min_qty",
          "value": "0"
        },
        {
          "id": 504581,
          "key": "_greenmart_min_max_quantities_max_qty",
          "value": "0"
        },
        {
          "id": 504582,
          "key": "_greenmart_min_max_quantities_step",
          "value": "0"
        },
        {
          "id": 504583,
          "key": "_greenmart_min_max_quantities_settings",
          "value": "no"
        },
        {
          "id": 504601,
          "key": "_yith_wfbt_ids",
          "value": []
        },
        {
          "id": 504602,
          "key": "_wcfmmp_commission",
          "value": {
            "commission_mode": "global",
            "commission_percent": "90",
            "commission_fixed": "",
            "tax_name": "",
            "tax_percent": ""
          }
        },
        {
          "id": 507698,
          "key": "_wcfm_product_views",
          "value": "362"
        },
        {
          "id": 536165,
          "key": "woolentor_views_count_product",
          "value": "51"
        },
        {
          "id": 609170,
          "key": "_selectproduct_layout",
          "value": ""
        },
        {
          "id": 609171,
          "key": "woolentor_cart_custom_content",
          "value": ""
        },
        {
          "id": 609172,
          "key": "woolentor_total_stock_quantity",
          "value": ""
        },
        {
          "id": 609173,
          "key": "_saleflash_text",
          "value": ""
        },
        {
          "id": 609174,
          "key": "_wcfm_product_approved_notified",
          "value": "yes"
        },
        {
          "id": 647139,
          "key": "rank_math_analytic_object_id",
          "value": "546"
        },
        {
          "id": 911344,
          "key": "_elementor_page_assets",
          "value": []
        }
      ],
      "stock_status": "instock",
      "has_options": false,
      "post_password": "",
      "global_unique_id": "",
      "aioseo_notices": [],
      "jetpack_sharing_enabled": true,
      "brands": [],
      "product_units": {
        "weight_unit": "g",
        "dimension_unit": "cm"
      },
      "wcfm_product_policy_data": {
        "visible": true,
        "shipping_policy": "<p><img class=\\\"alignnone wp-image-6761\\\" src=\\\"https://rushlane.net/wp-content/uploads/2024/06/cropped-1714921050976-281x281.png\\\" alt=\\\"\\\" width=\\\"156\\\" height=\\\"156\\\" data-mce-src=\\\"https://rushlane.net/wp-content/uploads/2024/06/cropped-1714921050976-281x281.png\\\"></p><p><strong>Shipping Policy</strong></p><p><strong>1. Delivery Zones and Timing:</strong> We deliver within specified zones as outlined on the app. Rushlane Operates within 10 km radius in Tura. Delivery times may vary depending on location and order volume. Customers can check the estimated delivery time on the platform.</p><p><strong>2. Delivery Charges:</strong> Delivery charges may apply based on distance and order value. Base charge of Rs. 75 is included for 1km - 2.5km radius and extra Rs. 10 will be added on each added km. For locations exceeding specified zones as outlined on the app will be paying return charge for the delivery Agent. Which means the customers have to pay the return charges to the delivery Agent.</p><p><strong>3. Order Tracking:</strong> Customers can track their orders in real-time WhatsApp integrated Tracker through our app. They will receive notifications regarding the status of their order, from preparation to delivery In the platform.</p><p><strong>4. Delivery Agents:</strong> We work with trusted delivery Agents to ensure timely and safe delivery of orders. While we strive to meet delivery timeframes, external factors like weather conditions and traffic may occasionally cause delays.</p><p><strong>5. Refunds and Returns:</strong> If there are any issues with your order, such as missing items or incorrect delivery, please contact our customer support team within 24 hours of receiving your order. We will investigate the issue and provide appropriate resolution, which may include refunds or replacements.</p><p><strong>6. Address Accuracy:</strong> Customers are responsible for providing accurate delivery information. Inaccurate or incomplete addresses may result in delays or failed deliveries. Please double-check your delivery address before placing your order.</p><p><strong>7. Delivery Instructions:</strong> Customers can provide specific delivery instructions during checkout, such as gate codes or apartment numbers, to facilitate smooth delivery.</p><p><strong>8. Contactless Delivery:</strong> In light of current health concerns, we offer contactless delivery options. Customers can request contactless delivery during checkout, and our delivery partners will leave the order at the specified location without direct contact.</p><p><strong>9. Order Cancellation:</strong> Orders can be canceled within a certain timeframe after placement, as specified on the app. Please note that orders cannot be canceled once they are out for delivery.</p><p><strong>10. Customer Support:</strong> For any inquiries or assistance regarding your order or delivery, please contact our customer support team via the app or email. We are available to assist you during our operating hours.</p><p><strong>11. Policy Updates:</strong> We reserve the right to update our shipping policy as needed. Any changes will be communicated to customers through our app or website.</p><p>By placing an order through our app, you agree to adhere to the terms outlined in this shipping policy.</p>",
        "shipping_policy_heading": "Shipping Policy",
        "refund_policy": "<p><strong>RUSHLANE REFUND POLICY</strong></p><p><br><strong>Full Refunds: </strong>Customers are eligible for a full refund if they cancel their order before it is<br>processed by the restaurant or if the order cannot be fulfilled for any reason. Refunds for canceled orders are processed immediately, and funds are returned to<br>the original payment method.</p><p><br><strong>Partial Refunds:</strong><br>In cases where only a portion of the order is unsatisfactory, customers may be<br>eligible for a partial refund. The amount refunded will be determined based on the<br>extent of the issue. Partial refunds are processed within 3-5 business days and returned to the original payment method.</p><p><br><strong>Refunds for Payment Issues:</strong><br>Customers are entitled to refunds for payment discrepancies, such as overcharging,<br>double billing, or unauthorized charges. Refunds for payment issues are processed promptly upon verification, typically within 3-5 business days.</p><p><br><strong>Conditions and Procedures:</strong></p><p><br><strong>Timely Reporting:</strong><br>Customers must report any issues with their order promptly, preferably within 24<br>hours of delivery, to be eligible for a refund or return. Late reports may not be considered for refunds or returns unless there are extenuating circumstances.</p><p><br><strong>Evidence:</strong><br>Customers may be required to provide evidence of the issue, such as clear<br>photographs of the food, packaging, or receipt. Providing detailed information about the issue, including the order number and item details, helps expedite the resolution process.</p><p><br><strong>Refund Process:</strong><br>Refunds are processed back to the original mode of payment used for the order.<br>Customers will receive email notifications confirming the initiation and completion<br>of the refund process.</p><p><br><strong>Customer Support:</strong><br>Customers can contact our customer support team via the app or website to report<br>issues, request refunds, or seek assistance with any concerns. Our customer support representatives are available 24/7 to address queries and resolve issues promptly.</p><p><br><strong>Discretionary Refunds:</strong><br>In exceptional cases where the issue does not strictly meet the stated criteria but<br>warrants a refund based on customer satisfaction, refunds may be issued at the<br>discretion of the platform.</p><p><br><strong>Exclusions:</strong><br>Certain items or situations may be excluded from the return and refund policy, such<br>as discounted or promotional items, or issues resulting from customer preferences<br>rather than quality or service issues.</p><p><br>Need help?<br>Contact us at support@Rushlane.net for questions related to refunds and returns.</p>",
        "refund_policy_heading": "Refund Policy",
        "cancellation_policy": "<p><strong>RUSHLANE RETURN  POLICY</strong><br><strong>Return Policy:</strong></p><p><br><strong>Quality Issues:</strong><br>Customers have the right to request a return or refund if they receive food items<br>that do not meet expected quality standards. This includes items that are stale,<br>spoiled, undercooked, overcooked, or otherwise not fit for consumption.<br>Customers must report quality issues within 24 hours of delivery. Photographic<br>evidence may be required to substantiate the claim.</p><p><br><strong>Incorrect Orders:</strong><br>If customers receive incorrect items or if items are missing from their order, they<br>can request a return or replacement. Customers must report incorrect orders within 24 hours of delivery. Clear documentation, such as a photo of the received items, may be requested.</p><p><br><strong>Damaged Packaging: </strong>Customers may request a return or refund if the packaging of the food items is damaged upon delivery and compromises the quality or safety of the food.<br>Reports of damaged packaging must be made within 24 hours of delivery. Photographic evidence may be necessary.</p><p><strong>Expired or Spoiled Food:</strong><br>Customers have the right to return or seek a refund for food items that are expired<br>or spoiled upon delivery. Reports of expired or spoiled food must be made within<br>24 hours of delivery. Customers may be required to provide photographic<br>evidence.</p><p><br></p><p><strong>Need help?<br>Contact us at support@Rushlane.net for questions related to refunds and returns.</strong></p><p><br><br></p>",
        "cancellation_policy_heading": "Cancellation / Return / Exchange Policy",
        "tab_title": "Store Policies"
      },
      "showAdditionalInfoTab": false,
      "store": {
        "vendor_id": 192,
        "vendor_display_name": "CDCRestaurant",
        "vendor_shop_name": "CDC Restaurant",
        "formatted_display_name": "CDC Restaurant - CDCRestaurant (#192 - CDCRestaurant)",
        "store_hide_email": "yes",
        "store_hide_phone": "yes",
        "store_hide_address": "no",
        "store_hide_description": "no",
        "store_hide_policy": "no",
        "store_products_per_page": 12,
        "vendor_email": "CDCRestaurant12@gmail.com",
        "vendor_address": "Chandmari Tura, CDC Food, Tura 794001, Meghalaya, India",
        "disable_vendor": "no",
        "is_store_offline": "no",
        "vendor_shop_logo": "https://rushlane.net/wp-content/uploads/2024/07/CDC-FOOD.png",
        "vendor_banner_type": "image",
        "vendor_banner": "https://rushlane.net/wp-content/uploads/2025/02/1.jpg",
        "mobile_banner": "https://rushlane.net/wp-content/uploads/2025/02/1.jpg",
        "vendor_list_banner_type": "image",
        "vendor_list_banner": "https://rushlane.net/wp-content/uploads/2025/02/1.jpg",
        "store_rating": "2.67",
        "email_verified": "0",
        "vendor_additional_info": [
          {
            "type": "text",
            "label": "",
            "options": "",
            "content": "",
            "help_text": "",
            "name": "",
            "value": ""
          }
        ],
        "vendor_description": "<p></p>\n",
        "vendor_policies": {
          "shipping_policy_heading": "Shipping Policy",
          "shipping_policy": "<p><img class=\\\"alignnone wp-image-6761\\\" src=\\\"https://rushlane.net/wp-content/uploads/2024/06/cropped-1714921050976-281x281.png\\\" alt=\\\"\\\" width=\\\"156\\\" height=\\\"156\\\" data-mce-src=\\\"https://rushlane.net/wp-content/uploads/2024/06/cropped-1714921050976-281x281.png\\\"></p><p><strong>Shipping Policy</strong></p><p><strong>1. Delivery Zones and Timing:</strong> We deliver within specified zones as outlined on the app. Rushlane Operates within 10 km radius in Tura. Delivery times may vary depending on location and order volume. Customers can check the estimated delivery time on the platform.</p><p><strong>2. Delivery Charges:</strong> Delivery charges may apply based on distance and order value. Base charge of Rs. 75 is included for 1km - 2.5km radius and extra Rs. 10 will be added on each added km. For locations exceeding specified zones as outlined on the app will be paying return charge for the delivery Agent. Which means the customers have to pay the return charges to the delivery Agent.</p><p><strong>3. Order Tracking:</strong> Customers can track their orders in real-time WhatsApp integrated Tracker through our app. They will receive notifications regarding the status of their order, from preparation to delivery In the platform.</p><p><strong>4. Delivery Agents:</strong> We work with trusted delivery Agents to ensure timely and safe delivery of orders. While we strive to meet delivery timeframes, external factors like weather conditions and traffic may occasionally cause delays.</p><p><strong>5. Refunds and Returns:</strong> If there are any issues with your order, such as missing items or incorrect delivery, please contact our customer support team within 24 hours of receiving your order. We will investigate the issue and provide appropriate resolution, which may include refunds or replacements.</p><p><strong>6. Address Accuracy:</strong> Customers are responsible for providing accurate delivery information. Inaccurate or incomplete addresses may result in delays or failed deliveries. Please double-check your delivery address before placing your order.</p><p><strong>7. Delivery Instructions:</strong> Customers can provide specific delivery instructions during checkout, such as gate codes or apartment numbers, to facilitate smooth delivery.</p><p><strong>8. Contactless Delivery:</strong> In light of current health concerns, we offer contactless delivery options. Customers can request contactless delivery during checkout, and our delivery partners will leave the order at the specified location without direct contact.</p><p><strong>9. Order Cancellation:</strong> Orders can be canceled within a certain timeframe after placement, as specified on the app. Please note that orders cannot be canceled once they are out for delivery.</p><p><strong>10. Customer Support:</strong> For any inquiries or assistance regarding your order or delivery, please contact our customer support team via the app or email. We are available to assist you during our operating hours.</p><p><strong>11. Policy Updates:</strong> We reserve the right to update our shipping policy as needed. Any changes will be communicated to customers through our app or website.</p><p>By placing an order through our app, you agree to adhere to the terms outlined in this shipping policy.</p>",
          "refund_policy_heading": "Refund Policy",
          "refund_policy": "<p><strong>RUSHLANE REFUND POLICY</strong></p><p><br><strong>Full Refunds: </strong>Customers are eligible for a full refund if they cancel their order before it is<br>processed by the restaurant or if the order cannot be fulfilled for any reason. Refunds for canceled orders are processed immediately, and funds are returned to<br>the original payment method.</p><p><br><strong>Partial Refunds:</strong><br>In cases where only a portion of the order is unsatisfactory, customers may be<br>eligible for a partial refund. The amount refunded will be determined based on the<br>extent of the issue. Partial refunds are processed within 3-5 business days and returned to the original payment method.</p><p><br><strong>Refunds for Payment Issues:</strong><br>Customers are entitled to refunds for payment discrepancies, such as overcharging,<br>double billing, or unauthorized charges. Refunds for payment issues are processed promptly upon verification, typically within 3-5 business days.</p><p><br><strong>Conditions and Procedures:</strong></p><p><br><strong>Timely Reporting:</strong><br>Customers must report any issues with their order promptly, preferably within 24<br>hours of delivery, to be eligible for a refund or return. Late reports may not be considered for refunds or returns unless there are extenuating circumstances.</p><p><br><strong>Evidence:</strong><br>Customers may be required to provide evidence of the issue, such as clear<br>photographs of the food, packaging, or receipt. Providing detailed information about the issue, including the order number and item details, helps expedite the resolution process.</p><p><br><strong>Refund Process:</strong><br>Refunds are processed back to the original mode of payment used for the order.<br>Customers will receive email notifications confirming the initiation and completion<br>of the refund process.</p><p><br><strong>Customer Support:</strong><br>Customers can contact our customer support team via the app or website to report<br>issues, request refunds, or seek assistance with any concerns. Our customer support representatives are available 24/7 to address queries and resolve issues promptly.</p><p><br><strong>Discretionary Refunds:</strong><br>In exceptional cases where the issue does not strictly meet the stated criteria but<br>warrants a refund based on customer satisfaction, refunds may be issued at the<br>discretion of the platform.</p><p><br><strong>Exclusions:</strong><br>Certain items or situations may be excluded from the return and refund policy, such<br>as discounted or promotional items, or issues resulting from customer preferences<br>rather than quality or service issues.</p><p><br>Need help?<br>Contact us at support@Rushlane.net for questions related to refunds and returns.</p>",
          "cancellation_policy_heading": "Cancellation / Return / Exchange Policy",
          "cancellation_policy": "<p><strong>RUSHLANE RETURN  POLICY</strong><br><strong>Return Policy:</strong></p><p><br><strong>Quality Issues:</strong><br>Customers have the right to request a return or refund if they receive food items<br>that do not meet expected quality standards. This includes items that are stale,<br>spoiled, undercooked, overcooked, or otherwise not fit for consumption.<br>Customers must report quality issues within 24 hours of delivery. Photographic<br>evidence may be required to substantiate the claim.</p><p><br><strong>Incorrect Orders:</strong><br>If customers receive incorrect items or if items are missing from their order, they<br>can request a return or replacement. Customers must report incorrect orders within 24 hours of delivery. Clear documentation, such as a photo of the received items, may be requested.</p><p><br><strong>Damaged Packaging: </strong>Customers may request a return or refund if the packaging of the food items is damaged upon delivery and compromises the quality or safety of the food.<br>Reports of damaged packaging must be made within 24 hours of delivery. Photographic evidence may be necessary.</p><p><strong>Expired or Spoiled Food:</strong><br>Customers have the right to return or seek a refund for food items that are expired<br>or spoiled upon delivery. Reports of expired or spoiled food must be made within<br>24 hours of delivery. Customers may be required to provide photographic<br>evidence.</p><p><br></p><p><strong>Need help?<br>Contact us at support@Rushlane.net for questions related to refunds and returns.</strong></p><p><br><br></p>"
        },
        "store_tab_headings": {
          "products": "Products",
          "about": "About",
          "policies": "Policies",
          "reviews": "Reviews (<span class=\"wcfm_reviews_count\">3</span>)",
          "followers": "Followers (<span class=\"wcfm_followers_count\">9</span>)"
        }
      },
      "product_restirction_message": "",
      "_links": {
        "self": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/products/14262",
            "targetHints": {
              "allow": [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE"
              ]
            }
          }
        ],
        "collection": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/products"
          }
        ]
      }
    },
    {
      "id": 28911,
      "name": "Chicken Chow (Half)",
      "slug": "chicken-chow-half",
      "permalink": "https://rushlane.net/product/chicken-chow-half/",
      "date_created": "2025-03-25T17:14:21",
      "date_created_gmt": "2025-03-25T11:44:21",
      "date_modified": "2025-03-25T17:18:38",
      "date_modified_gmt": "2025-03-25T11:48:38",
      "type": "simple",
      "status": "publish",
      "featured": false,
      "catalog_visibility": "visible",
      "description": "<p>Chicken Chow</p>\n",
      "short_description": "",
      "sku": "",
      "price": "60",
      "regular_price": "60",
      "sale_price": "",
      "date_on_sale_from": null,
      "date_on_sale_from_gmt": null,
      "date_on_sale_to": null,
      "date_on_sale_to_gmt": null,
      "on_sale": false,
      "purchasable": true,
      "total_sales": 0,
      "virtual": false,
      "downloadable": false,
      "downloads": [],
      "download_limit": -1,
      "download_expiry": -1,
      "external_url": "",
      "button_text": "",
      "tax_status": "none",
      "tax_class": "zero-rate",
      "manage_stock": false,
      "stock_quantity": null,
      "backorders": "no",
      "backorders_allowed": false,
      "backordered": false,
      "low_stock_amount": null,
      "sold_individually": false,
      "weight": "",
      "dimensions": {
        "length": "",
        "width": "",
        "height": ""
      },
      "shipping_required": true,
      "shipping_taxable": false,
      "shipping_class": "",
      "shipping_class_id": 0,
      "reviews_allowed": true,
      "average_rating": "0.00",
      "rating_count": 0,
      "upsell_ids": [],
      "cross_sell_ids": [],
      "parent_id": 0,
      "purchase_note": "",
      "categories": [
        {
          "id": 377,
          "name": "0 - 200",
          "slug": "100-200"
        },
        {
          "id": 110,
          "name": "Menu",
          "slug": "menu"
        },
        {
          "id": 356,
          "name": "Non-Veg",
          "slug": "non-veg"
        },
        {
          "id": 111,
          "name": "Noodles",
          "slug": "noodles"
        },
        {
          "id": 371,
          "name": "Snacks",
          "slug": "snacks"
        },
        {
          "id": 593,
          "name": "Street Eats(Menu)",
          "slug": "street-eatsmenu"
        }
      ],
      "tags": [],
      "images": [
        {
          "id": 28136,
          "date_created": "2025-03-11T22:05:51",
          "date_created_gmt": "2025-03-11T11:05:51",
          "date_modified": "2025-03-11T22:05:51",
          "date_modified_gmt": "2025-03-11T11:05:51",
          "src": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?fit=200%2C200&ssl=1",
          "name": "Chow WEBP FILE",
          "alt": "",
          "1536x1536": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?fit=200%2C200&ssl=1",
          "2048x2048": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?fit=200%2C200&ssl=1",
          "post-thumbnail": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?resize=200%2C187&ssl=1",
          "greenmart_photo_reviews_thumbnail_image": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?resize=100%2C100&ssl=1",
          "woocommerce_thumbnail": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?resize=200%2C200&ssl=1",
          "woocommerce_single": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?fit=200%2C200&ssl=1",
          "woocommerce_gallery_thumbnail": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?resize=160%2C160&ssl=1",
          "wcpr-photo-reviews": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?fit=200%2C200&ssl=1",
          "variation_swatches_image_size": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?resize=50%2C50&ssl=1",
          "variation_swatches_tooltip_size": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?resize=100%2C100&ssl=1",
          "woosq": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?resize=200%2C200&ssl=1",
          "quick_view_image_size": "https://i0.wp.com/rushlane.net/wp-content/uploads/2025/03/Chow-WEBP-FILE.webp?resize=200%2C200&ssl=1"
        }
      ],
      "attributes": [
        {
          "id": 4,
          "name": "Plate",
          "slug": "pa_plate",
          "position": 1,
          "visible": true,
          "variation": true,
          "options": [
            "Full",
            "Half"
          ]
        }
      ],
      "default_attributes": [],
      "variations": [],
      "grouped_products": [],
      "menu_order": 0,
      "price_html": "<span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#8377;</span>60.00</bdi></span>",
      "related_ids": [
        28923,
        28899,
        28088,
        28908,
        28902
      ],
      "meta_data": [
        {
          "id": 875756,
          "key": "os_meta",
          "value": []
        },
        {
          "id": 875774,
          "key": "_wp_page_template",
          "value": "default"
        },
        {
          "id": 875775,
          "key": "_subtitle",
          "value": ""
        },
        {
          "id": 875776,
          "key": "_video_url",
          "value": ""
        },
        {
          "id": 875777,
          "key": "_greenmart_min_max_quantities_min_qty",
          "value": "0"
        },
        {
          "id": 875778,
          "key": "_greenmart_min_max_quantities_max_qty",
          "value": "0"
        },
        {
          "id": 875779,
          "key": "_greenmart_min_max_quantities_step",
          "value": "0"
        },
        {
          "id": 875780,
          "key": "_greenmart_min_max_quantities_settings",
          "value": "no"
        },
        {
          "id": 875781,
          "key": "_yith_wfbt_ids",
          "value": []
        },
        {
          "id": 875782,
          "key": "_wcfmmp_commission",
          "value": {
            "commission_mode": "global",
            "commission_percent": "90",
            "commission_fixed": "",
            "tax_name": "",
            "tax_percent": ""
          }
        },
        {
          "id": 875783,
          "key": "_wcfm_product_views",
          "value": "131"
        },
        {
          "id": 875784,
          "key": "_wcfm_product_approved_notified",
          "value": "yes"
        },
        {
          "id": 876105,
          "key": "_aioseo_keywords",
          "value": []
        },
        {
          "id": 876108,
          "key": "_aioseo_og_article_section",
          "value": ""
        },
        {
          "id": 876109,
          "key": "_aioseo_og_article_tags",
          "value": []
        },
        {
          "id": 911436,
          "key": "_elementor_page_assets",
          "value": []
        }
      ],
      "stock_status": "instock",
      "has_options": false,
      "post_password": "",
      "global_unique_id": "",
      "aioseo_notices": [],
      "jetpack_sharing_enabled": true,
      "brands": [],
      "product_units": {
        "weight_unit": "g",
        "dimension_unit": "cm"
      },
      "wcfm_product_policy_data": {
        "visible": true,
        "shipping_policy": "<p><img class=\\\"alignnone wp-image-6761\\\" src=\\\"https://rushlane.net/wp-content/uploads/2024/06/cropped-1714921050976-281x281.png\\\" alt=\\\"\\\" width=\\\"156\\\" height=\\\"156\\\" data-mce-src=\\\"https://rushlane.net/wp-content/uploads/2024/06/cropped-1714921050976-281x281.png\\\"></p><p><strong>Shipping Policy</strong></p><p><strong>1. Delivery Zones and Timing:</strong> We deliver within specified zones as outlined on the app. Rushlane Operates within 10 km radius in Tura. Delivery times may vary depending on location and order volume. Customers can check the estimated delivery time on the platform.</p><p><strong>2. Delivery Charges:</strong> Delivery charges may apply based on distance and order value. Base charge of Rs. 75 is included for 1km - 2.5km radius and extra Rs. 10 will be added on each added km. For locations exceeding specified zones as outlined on the app will be paying return charge for the delivery Agent. Which means the customers have to pay the return charges to the delivery Agent.</p><p><strong>3. Order Tracking:</strong> Customers can track their orders in real-time WhatsApp integrated Tracker through our app. They will receive notifications regarding the status of their order, from preparation to delivery In the platform.</p><p><strong>4. Delivery Agents:</strong> We work with trusted delivery Agents to ensure timely and safe delivery of orders. While we strive to meet delivery timeframes, external factors like weather conditions and traffic may occasionally cause delays.</p><p><strong>5. Refunds and Returns:</strong> If there are any issues with your order, such as missing items or incorrect delivery, please contact our customer support team within 24 hours of receiving your order. We will investigate the issue and provide appropriate resolution, which may include refunds or replacements.</p><p><strong>6. Address Accuracy:</strong> Customers are responsible for providing accurate delivery information. Inaccurate or incomplete addresses may result in delays or failed deliveries. Please double-check your delivery address before placing your order.</p><p><strong>7. Delivery Instructions:</strong> Customers can provide specific delivery instructions during checkout, such as gate codes or apartment numbers, to facilitate smooth delivery.</p><p><strong>8. Contactless Delivery:</strong> In light of current health concerns, we offer contactless delivery options. Customers can request contactless delivery during checkout, and our delivery partners will leave the order at the specified location without direct contact.</p><p><strong>9. Order Cancellation:</strong> Orders can be canceled within a certain timeframe after placement, as specified on the app. Please note that orders cannot be canceled once they are out for delivery.</p><p><strong>10. Customer Support:</strong> For any inquiries or assistance regarding your order or delivery, please contact our customer support team via the app or email. We are available to assist you during our operating hours.</p><p><strong>11. Policy Updates:</strong> We reserve the right to update our shipping policy as needed. Any changes will be communicated to customers through our app or website.</p><p>By placing an order through our app, you agree to adhere to the terms outlined in this shipping policy.</p>",
        "shipping_policy_heading": "Shipping Policy",
        "refund_policy": "<p><strong>RUSHLANE REFUND POLICY</strong></p><p><br><strong>Full Refunds: </strong>Customers are eligible for a full refund if they cancel their order before it is<br>processed by the restaurant or if the order cannot be fulfilled for any reason. Refunds for canceled orders are processed immediately, and funds are returned to<br>the original payment method.</p><p><br><strong>Partial Refunds:</strong><br>In cases where only a portion of the order is unsatisfactory, customers may be<br>eligible for a partial refund. The amount refunded will be determined based on the<br>extent of the issue. Partial refunds are processed within 3-5 business days and returned to the original payment method.</p><p><br><strong>Refunds for Payment Issues:</strong><br>Customers are entitled to refunds for payment discrepancies, such as overcharging,<br>double billing, or unauthorized charges. Refunds for payment issues are processed promptly upon verification, typically within 3-5 business days.</p><p><br><strong>Conditions and Procedures:</strong></p><p><br><strong>Timely Reporting:</strong><br>Customers must report any issues with their order promptly, preferably within 24<br>hours of delivery, to be eligible for a refund or return. Late reports may not be considered for refunds or returns unless there are extenuating circumstances.</p><p><br><strong>Evidence:</strong><br>Customers may be required to provide evidence of the issue, such as clear<br>photographs of the food, packaging, or receipt. Providing detailed information about the issue, including the order number and item details, helps expedite the resolution process.</p><p><br><strong>Refund Process:</strong><br>Refunds are processed back to the original mode of payment used for the order.<br>Customers will receive email notifications confirming the initiation and completion<br>of the refund process.</p><p><br><strong>Customer Support:</strong><br>Customers can contact our customer support team via the app or website to report<br>issues, request refunds, or seek assistance with any concerns. Our customer support representatives are available 24/7 to address queries and resolve issues promptly.</p><p><br><strong>Discretionary Refunds:</strong><br>In exceptional cases where the issue does not strictly meet the stated criteria but<br>warrants a refund based on customer satisfaction, refunds may be issued at the<br>discretion of the platform.</p><p><br><strong>Exclusions:</strong><br>Certain items or situations may be excluded from the return and refund policy, such<br>as discounted or promotional items, or issues resulting from customer preferences<br>rather than quality or service issues.</p><p><br>Need help?<br>Contact us at support@Rushlane.net for questions related to refunds and returns.</p>",
        "refund_policy_heading": "Refund Policy",
        "cancellation_policy": "<p><strong>RUSHLANE RETURN  POLICY</strong><br><strong>Return Policy:</strong></p><p><br><strong>Quality Issues:</strong><br>Customers have the right to request a return or refund if they receive food items<br>that do not meet expected quality standards. This includes items that are stale,<br>spoiled, undercooked, overcooked, or otherwise not fit for consumption.<br>Customers must report quality issues within 24 hours of delivery. Photographic<br>evidence may be required to substantiate the claim.</p><p><br><strong>Incorrect Orders:</strong><br>If customers receive incorrect items or if items are missing from their order, they<br>can request a return or replacement. Customers must report incorrect orders within 24 hours of delivery. Clear documentation, such as a photo of the received items, may be requested.</p><p><br><strong>Damaged Packaging: </strong>Customers may request a return or refund if the packaging of the food items is damaged upon delivery and compromises the quality or safety of the food.<br>Reports of damaged packaging must be made within 24 hours of delivery. Photographic evidence may be necessary.</p><p><strong>Expired or Spoiled Food:</strong><br>Customers have the right to return or seek a refund for food items that are expired<br>or spoiled upon delivery. Reports of expired or spoiled food must be made within<br>24 hours of delivery. Customers may be required to provide photographic<br>evidence.</p><p><br></p><p><strong>Need help?<br>Contact us at support@Rushlane.net for questions related to refunds and returns.</strong></p><p><br><br></p>",
        "cancellation_policy_heading": "Cancellation / Return / Exchange Policy",
        "tab_title": "Store Policies"
      },
      "showAdditionalInfoTab": true,
      "store": {
        "vendor_id": 939,
        "vendor_display_name": "Street Eats",
        "vendor_shop_name": "Street Eats",
        "formatted_display_name": "Street Eats - Street Eats (#939 - EatStreets)",
        "store_hide_email": "yes",
        "store_hide_phone": "no",
        "store_hide_address": "no",
        "store_hide_description": "no",
        "store_hide_policy": "no",
        "store_products_per_page": 30,
        "vendor_email": "Eatstreetsrushlane@gmail.com",
        "vendor_address": "Lower Hawakhana Near AOC Petrol Pump, Tura 794001, Meghalaya, India",
        "disable_vendor": "no",
        "is_store_offline": "no",
        "vendor_shop_logo": "https://rushlane.net/wp-content/uploads/2025/03/LOGO-PNG-RESIZED.png",
        "vendor_banner_type": "image",
        "vendor_banner": "https://rushlane.net/wp-content/uploads/2025/02/1.jpg",
        "mobile_banner": "https://rushlane.net/wp-content/uploads/2025/02/1.jpg",
        "vendor_list_banner_type": "image",
        "vendor_list_banner": "https://rushlane.net/wp-content/uploads/2025/02/1.jpg",
        "store_rating": "2",
        "email_verified": "1",
        "vendor_additional_info": [
          {
            "type": "text",
            "label": "",
            "options": "",
            "content": "",
            "help_text": "",
            "name": "",
            "value": ""
          }
        ],
        "vendor_description": "<p></p>\n",
        "vendor_policies": {
          "shipping_policy_heading": "Shipping Policy",
          "shipping_policy": "<p><img class=\\\"alignnone wp-image-6761\\\" src=\\\"https://rushlane.net/wp-content/uploads/2024/06/cropped-1714921050976-281x281.png\\\" alt=\\\"\\\" width=\\\"156\\\" height=\\\"156\\\" data-mce-src=\\\"https://rushlane.net/wp-content/uploads/2024/06/cropped-1714921050976-281x281.png\\\"></p><p><strong>Shipping Policy</strong></p><p><strong>1. Delivery Zones and Timing:</strong> We deliver within specified zones as outlined on the app. Rushlane Operates within 10 km radius in Tura. Delivery times may vary depending on location and order volume. Customers can check the estimated delivery time on the platform.</p><p><strong>2. Delivery Charges:</strong> Delivery charges may apply based on distance and order value. Base charge of Rs. 75 is included for 1km - 2.5km radius and extra Rs. 10 will be added on each added km. For locations exceeding specified zones as outlined on the app will be paying return charge for the delivery Agent. Which means the customers have to pay the return charges to the delivery Agent.</p><p><strong>3. Order Tracking:</strong> Customers can track their orders in real-time WhatsApp integrated Tracker through our app. They will receive notifications regarding the status of their order, from preparation to delivery In the platform.</p><p><strong>4. Delivery Agents:</strong> We work with trusted delivery Agents to ensure timely and safe delivery of orders. While we strive to meet delivery timeframes, external factors like weather conditions and traffic may occasionally cause delays.</p><p><strong>5. Refunds and Returns:</strong> If there are any issues with your order, such as missing items or incorrect delivery, please contact our customer support team within 24 hours of receiving your order. We will investigate the issue and provide appropriate resolution, which may include refunds or replacements.</p><p><strong>6. Address Accuracy:</strong> Customers are responsible for providing accurate delivery information. Inaccurate or incomplete addresses may result in delays or failed deliveries. Please double-check your delivery address before placing your order.</p><p><strong>7. Delivery Instructions:</strong> Customers can provide specific delivery instructions during checkout, such as gate codes or apartment numbers, to facilitate smooth delivery.</p><p><strong>8. Contactless Delivery:</strong> In light of current health concerns, we offer contactless delivery options. Customers can request contactless delivery during checkout, and our delivery partners will leave the order at the specified location without direct contact.</p><p><strong>9. Order Cancellation:</strong> Orders can be canceled within a certain timeframe after placement, as specified on the app. Please note that orders cannot be canceled once they are out for delivery.</p><p><strong>10. Customer Support:</strong> For any inquiries or assistance regarding your order or delivery, please contact our customer support team via the app or email. We are available to assist you during our operating hours.</p><p><strong>11. Policy Updates:</strong> We reserve the right to update our shipping policy as needed. Any changes will be communicated to customers through our app or website.</p><p>By placing an order through our app, you agree to adhere to the terms outlined in this shipping policy.</p>",
          "refund_policy_heading": "Refund Policy",
          "refund_policy": "<p><strong>RUSHLANE REFUND POLICY</strong></p><p><br><strong>Full Refunds: </strong>Customers are eligible for a full refund if they cancel their order before it is<br>processed by the restaurant or if the order cannot be fulfilled for any reason. Refunds for canceled orders are processed immediately, and funds are returned to<br>the original payment method.</p><p><br><strong>Partial Refunds:</strong><br>In cases where only a portion of the order is unsatisfactory, customers may be<br>eligible for a partial refund. The amount refunded will be determined based on the<br>extent of the issue. Partial refunds are processed within 3-5 business days and returned to the original payment method.</p><p><br><strong>Refunds for Payment Issues:</strong><br>Customers are entitled to refunds for payment discrepancies, such as overcharging,<br>double billing, or unauthorized charges. Refunds for payment issues are processed promptly upon verification, typically within 3-5 business days.</p><p><br><strong>Conditions and Procedures:</strong></p><p><br><strong>Timely Reporting:</strong><br>Customers must report any issues with their order promptly, preferably within 24<br>hours of delivery, to be eligible for a refund or return. Late reports may not be considered for refunds or returns unless there are extenuating circumstances.</p><p><br><strong>Evidence:</strong><br>Customers may be required to provide evidence of the issue, such as clear<br>photographs of the food, packaging, or receipt. Providing detailed information about the issue, including the order number and item details, helps expedite the resolution process.</p><p><br><strong>Refund Process:</strong><br>Refunds are processed back to the original mode of payment used for the order.<br>Customers will receive email notifications confirming the initiation and completion<br>of the refund process.</p><p><br><strong>Customer Support:</strong><br>Customers can contact our customer support team via the app or website to report<br>issues, request refunds, or seek assistance with any concerns. Our customer support representatives are available 24/7 to address queries and resolve issues promptly.</p><p><br><strong>Discretionary Refunds:</strong><br>In exceptional cases where the issue does not strictly meet the stated criteria but<br>warrants a refund based on customer satisfaction, refunds may be issued at the<br>discretion of the platform.</p><p><br><strong>Exclusions:</strong><br>Certain items or situations may be excluded from the return and refund policy, such<br>as discounted or promotional items, or issues resulting from customer preferences<br>rather than quality or service issues.</p><p><br>Need help?<br>Contact us at support@Rushlane.net for questions related to refunds and returns.</p>",
          "cancellation_policy_heading": "Cancellation / Return / Exchange Policy",
          "cancellation_policy": "<p><strong>RUSHLANE RETURN  POLICY</strong><br><strong>Return Policy:</strong></p><p><br><strong>Quality Issues:</strong><br>Customers have the right to request a return or refund if they receive food items<br>that do not meet expected quality standards. This includes items that are stale,<br>spoiled, undercooked, overcooked, or otherwise not fit for consumption.<br>Customers must report quality issues within 24 hours of delivery. Photographic<br>evidence may be required to substantiate the claim.</p><p><br><strong>Incorrect Orders:</strong><br>If customers receive incorrect items or if items are missing from their order, they<br>can request a return or replacement. Customers must report incorrect orders within 24 hours of delivery. Clear documentation, such as a photo of the received items, may be requested.</p><p><br><strong>Damaged Packaging: </strong>Customers may request a return or refund if the packaging of the food items is damaged upon delivery and compromises the quality or safety of the food.<br>Reports of damaged packaging must be made within 24 hours of delivery. Photographic evidence may be necessary.</p><p><strong>Expired or Spoiled Food:</strong><br>Customers have the right to return or seek a refund for food items that are expired<br>or spoiled upon delivery. Reports of expired or spoiled food must be made within<br>24 hours of delivery. Customers may be required to provide photographic<br>evidence.</p><p><br></p><p><strong>Need help?<br>Contact us at support@Rushlane.net for questions related to refunds and returns.</strong></p><p><br><br></p>"
        },
        "store_tab_headings": {
          "products": "Products",
          "about": "About",
          "policies": "Policies",
          "reviews": "Reviews (<span class=\"wcfm_reviews_count\">1</span>)",
          "followers": "Followers (<span class=\"wcfm_followers_count\">0</span>)"
        }
      },
      "product_restirction_message": "",
      "_links": {
        "self": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/products/28911",
            "targetHints": {
              "allow": [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE"
              ]
            }
          }
        ],
        "collection": [
          {
            "href": "https://rushlane.net/wp-json/wc/v3/products"
          }
        ]
      }
    },
  ]
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Products</Text>

      <FlatList
        data={productItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='flex-row justify-between mb-4 gap-4 border-b border-gray-300 pb-4'>
            <View className='flex-col w-[12rem] gap-1.5 justify-start'>
              {
                item.categories.findIndex((cat) => cat.id == 355) == -1 ?
                  <Icon as={Triangle} className=' h-4 w-4 fill-red-600 stroke-red-700' /> :
                  <Icon as={Circle} className=' h-4 w-4 fill-green-600 stroke-green-700' />
              }
              <Text className=' text-xl font-bold'>{item.name}</Text>
              {
                item.on_sale ? (
                  <View className='flex-row items-center gap-2'>
                    <Text className='text-lg font-semibold'>₹ 200{item.sale_price}</Text>
                    <Text className='text-base text-gray-500 line-through'>₹{item.regular_price}</Text>
                  </View>
                ) : (
                  <Text className='text-lg font-semibold'>₹ {item.price}</Text>
                )
              }
              <View className='flex-row gap-1 items-center'>
                {Array.from({ length: 5 }, (_, index) => (
                  <Icon
                    key={index}
                    as={Star}
                    className={`w-3 h-3 ${index < Math.round(Number(item.average_rating))
                      ? 'fill-yellow-400 stroke-yellow-500'
                      : 'fill-gray-300 stroke-gray-400'
                      }`}
                  />
                ))}
                <Text className='text-sm px-1 text-gray-500'>({item.rating_count})</Text>
              </View>
              <View className='flex-row items-center gap-1'>
                <Icon as={ChefHat} className='w-4 h-4 stroke-blue-500' />
                <Text className='text-base text-blue-500 font-medium'>{item.store.vendor_shop_name}</Text>
              </View>
              <View className='flex-row gap-2 pt-2'>
                <View className=' p-2 bg-gray-50 rounded-full border border-gray-200 outline'><Icon as={Bookmark} className='stroke-gray-500' /></View>
                <View className=' p-2 bg-gray-50 rounded-full border border-gray-200 outline'><Icon as={Share} className='stroke-gray-500' /></View>
              </View>
            </View>
            {/* Image */}
            <View className='relative'>
              <Image
                alt='banner1'
                source={{
                  uri: item.images[0].src,
                }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 24,
                  marginRight: 16,
                  borderColor: '#E5E7EB',
                  borderWidth: 1,
                }}
              />
              <View className='absolute flex-row items-center justify-center bottom-4 w-full'>
                <Button className=' w-[8rem] rounded-full bg-orange-500/80 border border-orange-400' onPress={() => openModal(item)} >
                  <ButtonText className='text-xl text-white'>
                    {item.attributes.length > 0 ? 'SELECT' : 'ADD'}
                  </ButtonText>
                </Button>
              </View>
            </View>
          </View>
        )}
      />

      <HalfScreenModal
        isVisible={modalVisible}
        onClose={closeModal}
        title="Select Options"
        data={selectedItem}
        height={60} // 60% of screen height
      >
        {selectedItem && (
          <FlatList
            data={selectedItem.attributes}
            keyExtractor={(item) => item.id.toString()}

            renderItem={({ item }) => (
              <View className='flex-col justify-between mb-4 gap-4 border-b border-gray-300 pb-4'>
                <View>
                  <Text className='text-2xl font-semibold'>{item.name}</Text>
                  <Text>{`Choose one out of this ${item.options.length} options`}</Text>
                </View>
                <View className='flex-col gap-2'>
                  {item.options.map((option, index) => (
                    <View key={index} className='flex flex-row gap-2'>
                      <Checkbox size="md" value=''>
                        <CheckboxIndicator>
                          <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                      </Checkbox>
                      <Text>{option}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            ListFooterComponent={() => (
              <Button>
                <ButtonText>
                  Add to Cart
                </ButtonText>
              </Button>
            )}
          />
        )}
      </HalfScreenModal>
    </View>
  );
}