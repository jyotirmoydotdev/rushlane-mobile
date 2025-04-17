export interface CategoriesType {
    id: number,
    name: string,
    slug:string,
    parent: number,
    description: string,
    display: string,
    image: {
        id: number,
        date_created: string,
        date_created_gmt: string,
        date_modified: string,
        date_modified_gmt: string,
        src: string,
        name: string,
        alt: string,
    } | null,
    menu_order: number,
    count: number,
    _links: {
        self: {
            herf: string,
            targetHints: {
                allow: string[],
            }
        }[],
        collection: {
            herf: string
        }[],
        up: {
            herf: string
        }[],
    }
}