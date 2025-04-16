import { storeResponseType, storeType } from "@/lib/type/storeType";
import axios from "axios"

export async function GET(_request: Request) {
    try {
        const response = await axios.get<storeResponseType[]>(`https://www.rushlane.net/wp-json/wcfmmp/v1/store-vendors`,{
            params: {
                per_page: 30,
            }
        });

        if (response.status !== 200) {
            return Response.json({ error: "Store not found" }, { status: 500 });
        }

        const storeData: storeResponseType[] = response.data;

        const validatedStoreData: storeResponseType[]  = validateStoreData(storeData);

        const data: storeType[] = convertToStoreTypeAll(validatedStoreData);

        return Response.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching store data:", error);
        return Response.json({
            message: "Failed to fetch store data",
            error: error,
        }, { status: 500 });
    }
}

function convertToStoreTypeAll(storeData: storeResponseType[]): storeType[] {
    const storeList: storeType[] = []
    storeData.forEach((store) => {
        const convertedStore = convertToStoreType(store);
        storeList.push(convertedStore);
    });
    return storeList
}

function convertToStoreType(storeData: storeResponseType): storeType {
    return {
      id: String(storeData.vendor_id),
      name: storeData.vendor_shop_name || "",
      show: {
        email: storeData.store_hide_email !== "yes",
        phone: storeData.store_hide_phone !== "yes",
        address: storeData.store_hide_address !== "yes",
        description: storeData.store_hide_description !== "yes",
        policy: storeData.store_hide_policy !== "yes",
      },
      emailVerified: storeData.email_verified === "1",
      email: storeData.store_hide_email !== "yes" ? (storeData.vendor_email || null) : null,
      address: storeData.store_hide_address !== "yes" ? (storeData.vendor_address || null) : null,
      description: storeData.store_hide_description !== "yes" ? (storeData.vendor_description || null) : null,
      banner: storeData.vendor_banner ? {
        type: storeData.vendor_banner_type || "image",
        url: storeData.vendor_banner || "",
        mobileUrl: storeData.mobile_banner || storeData.vendor_banner || "",
      } : null,
      logoUrl: storeData.vendor_shop_logo || null,
      rating: storeData.store_rating || 0,
      policies: storeData.store_hide_policy !== "yes" ? (storeData.vendor_policies ? {
        shipping_policy_heading: storeData.vendor_policies.shipping_policy_heading || "",
        shipping_policy: storeData.vendor_policies.shipping_policy || "",
        refund_policy_heading: storeData.vendor_policies.refund_policy_heading || "",
        refund_policy: storeData.vendor_policies.refund_policy || "",
        cancellation_policy_heading: storeData.vendor_policies.cancellation_policy_heading || "",
        cancellation_policy: storeData.vendor_policies.cancellation_policy || "",
      } : null) : null,
    };
  }


function validateStoreData(storeData: storeResponseType[]) : storeResponseType[] {
    const validStores : storeResponseType[] = []
    storeData.forEach((store) => {
        if ( store.disable_vendor === "no") {
            validStores.push(store);
        }
    });
    return validStores
}