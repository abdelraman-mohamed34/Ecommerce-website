export const navigation = {
    categories: [
        // women
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'dresses',
                    href: '/category?name=womens-dresses',
                    imageSrc: 'https://plus.unsplash.com/premium_photo-1673481601147-ee95199d3896?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3Nlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
                    imageAlt: 'dresses.',
                },
                {
                    name: 'Tops',
                    href: '/category?name=tops',
                    imageSrc: 'https://images.unsplash.com/photo-1525171254930-643fc658b64e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VG9wc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
                    imageAlt: 'Tops.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '/category?name=tops', prop: 'tops' },
                        { name: 'Dresses', href: '/category?name=womens-dresses', prop: 'womens-dresses' },
                        { name: 'Shoes', href: '/category?name=womens-shoes', prop: 'womens-shoes' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '/category?name=womens-watches', prop: 'womens-watches' },
                        { name: 'Bags', href: '/category?name=womens-bags', prop: 'womens-bags' },
                        { name: 'Jewellery', href: '/category?name=womens-jewellery', prop: 'womens-jewellery' },
                        { name: 'Sunglasses', href: '/category?name=sunglasses', prop: 'sunglasses' },
                        { name: 'Perfumes', href: '/category?name=fragrances', prop: 'fragrances' },
                    ],
                },
            ],
        },

        // men
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'hand watch',
                    href: '/category?name=womens-watches',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg',
                    imageAlt: 'Stylish men shirts',
                },
                {
                    "name": "Shoes Collection",
                    "href": "/category?name=mens-shoes",
                    "imageSrc": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
                    "imageAlt": "Men shoes collection"
                }
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Shirts', href: '/category?name=mens-shirts', prop: 'mens-shirts' },
                        { name: 'Shoes', href: '/category?name=mens-shoes', prop: 'mens-shoes' },
                        { name: 'Watches', href: '/category?name=mens-watches', prop: 'mens-watches' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Sunglasses', href: '/category?name=sunglasses', prop: 'sunglasses' },
                        { name: 'Fragrances', href: '/category?name=fragrances', prop: 'fragrances' },
                    ],
                },
            ],
        },

        // electronics
        {
            id: 'electronics',
            name: 'Electronics',
            featured: [
                {
                    name: 'Tablets',
                    href: '/category?name=tablets',
                    imageSrc: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFibGV0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
                    imageAlt: 'Latest tablets',
                },
                {
                    name: 'Laptops',
                    href: '/category?name=laptops',
                    imageSrc: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
                    imageAlt: 'Latest laptops',
                },
            ],
            sections: [
                {
                    id: 'computing',
                    name: 'Computing & Phones',
                    items: [
                        { name: 'Smartphones', href: '/category?name=smartphones', prop: 'smartphones' },
                        { name: 'Tablets', href: '/category?name=tablets', prop: 'tablets' },
                        { name: 'Laptops', href: '/category?name=laptops', prop: 'laptops' },
                    ],
                },
            ],
        },

        // home
        {
            id: 'home',
            name: 'Home & Living',
            featured: [],
            sections: [
                {
                    id: 'furniture',
                    name: 'Furniture',
                    items: [
                        { name: 'home', href: '/category?name=beds', prop: 'furniture' },
                    ],
                },
                {
                    id: 'lighting-decor',
                    name: 'Lighting & Decor',
                    items: [
                        { name: 'Home Decoration', href: '/category?name=home-decoration', prop: 'home-decoration' },
                    ],
                },
            ],
        },

        // drivers
        {
            id: 'vehicles',
            name: 'Vehicles',
            featured: [],
            sections: [
                {
                    id: 'motorcycles',
                    name: 'Motorcycles',
                    items: [
                        { name: 'Motorcycle', href: '/category?name=motorcycle', prop: 'motorcycle' },
                    ],
                },
            ],
        },

        // food
        {
            id: 'food',
            name: 'Food',
            featured: [],
            sections: [
                {
                    id: 'groceries',
                    name: 'Groceries',
                    items: [
                        { name: 'Groceries', href: '/category?name=groceries', prop: 'groceries' },
                    ],
                },
            ],
        },
    ],

    pages: [],
}
