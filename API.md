| Route                               | Details                                       | Parameter                                            |
| ----------------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| GET `/api/stores`                   | retrive all active store                      |                                                      |
| GET `/api/stores/<id>`              | retrive the store details                     |                                                      |
| GET `/api/stores/<id>/products`     | retrive all the active products of a store    |                                                      |
| GET `/api/products`                 | retrive all the active products               |                                                      |
| GET `/api/products/<id>`            | retrive the product details                   |                                                      |
| GET `/api/categories`               | retrive the all categories                    | `home: boolean` only return top 15 trending products |
| GET `/api/categories/<id>`          | retrive the categories details                |                                                      |
| GET `/api/categories/<id>/products` | retrive all the active products of a category |                                                      |
