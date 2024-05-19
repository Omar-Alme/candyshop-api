export const urls = {
    products: "/products",
    productsTags: "/tags",
    orders: (userId: number) => `/users/${userId}/orders`
};