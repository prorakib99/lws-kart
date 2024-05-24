import Link from 'next/link';
import { FaHouse } from 'react-icons/fa6';
import Image from 'next/image';
import {
    FaStar,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaHeart,
    FaShoppingBag,
    FaChevronRight,
    FaSearch
} from 'react-icons/fa';

// import all Images
import product1 from '@/assets/images/products/product1.jpg';
import { getDictionary } from '../dictionaries/dictionaries';
import ProductImages from './_components/ProductImages';
import getSingleProduct from '@/app/server/getData/getSingleProduct';
import Product from '@/app/components/Product/Product';

const ProductsDetailsPage = async ({ params: { lang, productId } }) => {
    const {
        product_details_page: {
            add_to_cart,
            add_to_wishlist,
            page_title,
            product_reviews,
            product_availability,
            product_brand,
            product_category,
            product_sku,
            product_quantity,
            product_product_details,
            product_related_products
        }
    } = await getDictionary(lang);

    const products = await getSingleProduct(productId);
    const { product, relatedProducts } = JSON.parse(products);

    const {
        _id,
        name,
        image,
        price,
        discount_price,
        reviewsNumber,
        ratings,
        availability,
        brand,
        category,
        details,
        description,
        sizes,
        colors,
        sku,
        soldCounts
    } = product;

    return (
        <div>
            {/* breadcrumb */}
            <div className='container flex items-center gap-3 py-4'>
                <Link className='text-base text-primary' href='/'>
                    <FaHouse />
                </Link>
                <span className='text-sm text-gray-400'>
                    <FaChevronRight />
                </span>
                <p className='font-medium text-gray-600'>{page_title}</p>
            </div>
            {/* breadcrumb */}

            {/* product details */}
            <div className='container grid grid-cols-1 gap-6 lg:grid-cols-2'>
                <ProductImages />
                <div>
                    <h2 className='mb-2 text-2xl font-medium uppercase md:text-3xl'>{name}</h2>
                    <div className='flex items-center mb-4'>
                        <div className='flex gap-1 text-sm text-yellow-400'>
                            {[...Array(Math.floor(ratings))].map((_, index) => (
                                <FaStar key={index} />
                            ))}
                        </div>
                        <div className='ml-3 text-xs text-gray-500'>
                            ({reviewsNumber} {product_reviews})
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <p className='space-x-2 font-semibold text-gray-800'>
                            <span>{product_availability}: </span>
                            <span className='text-green-600'>
                                {availability ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </p>
                        <p className='space-x-2'>
                            <span className='font-semibold text-gray-800'>{product_brand}: </span>
                            <span className='text-gray-600'>{brand}</span>
                        </p>
                        <p className='space-x-2'>
                            <span className='font-semibold text-gray-800'>
                                {product_category}:{' '}
                            </span>
                            <span className='text-gray-600'>{category}</span>
                        </p>
                        <p className='space-x-2'>
                            <span className='font-semibold text-gray-800'>{product_sku}: </span>
                            <span className='text-gray-600'>{sku}</span>
                        </p>
                    </div>
                    <div className='flex items-baseline mt-4 mb-1 space-x-2 font-roboto'>
                        <p className='text-xl font-semibold text-primary'>${price}</p>
                        <p className='text-base text-gray-400 line-through'>${discount_price}</p>
                    </div>
                    <p className='mt-4 text-gray-600'>{description}</p>

                    <div className='mt-4'>
                        <h3 className='mb-1 text-sm text-gray-800 uppercase'>{product_quantity}</h3>
                        <div className='flex text-gray-600 border border-gray-300 divide-x divide-gray-300 w-max'>
                            <button className='flex items-center justify-center w-8 h-8 text-xl cursor-pointer select-none'>
                                -
                            </button>
                            <div className='flex items-center justify-center w-8 h-8 text-base'>
                                4
                            </div>
                            <button className='flex items-center justify-center w-8 h-8 text-xl cursor-pointer select-none'>
                                +
                            </button>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-3 pt-5 pb-5 mt-3 border-b border-gray-200 md:mt-6 md:max-w-md md:grid-cols-2'>
                        <button className='flex items-center justify-center w-full gap-2 py-2 font-medium text-white uppercase transition-colors border rounded bg-primary border-primary hover:bg-transparent hover:text-primary'>
                            <FaShoppingBag /> {add_to_cart}
                        </button>
                        <button className='flex items-center justify-center w-full gap-2 py-2 font-medium text-gray-600 uppercase transition-colors border border-gray-300 rounded hover:text-primary'>
                            <FaHeart /> {add_to_wishlist}
                        </button>
                    </div>

                    <div className='flex gap-3 mt-4'>
                        <Link
                            href='#'
                            className='flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500'
                        >
                            <FaFacebookF />
                        </Link>
                        <Link
                            href='#'
                            className='flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500'
                        >
                            <FaTwitter />
                        </Link>
                        <Link
                            href='#'
                            className='flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500'
                        >
                            <FaInstagram />
                        </Link>
                    </div>
                </div>
            </div>
            {/* description */}
            <div className='container pt-5 pb-10 md:pt-8 md:pb-16'>
                <h3 className='pb-3 text-lg font-medium text-gray-800 border-b border-gray-200'>
                    {product_product_details}
                </h3>
                <div className='w-full lg:w-3/5'>
                    <div className='flex flex-col gap-1 mt-4 text-gray-600'>
                        <p>Material: {details.material}</p>
                        <p>Dimensions: {details.dimensions}</p>
                        <p>Weight: {details.weight}</p>
                    </div>
                </div>
            </div>
            {/*description*/}

            {/* related product */}
            <div className='container pb-16'>
                <h2 className='mb-6 text-2xl font-medium text-gray-800 uppercase'>
                    {product_related_products}
                </h2>
                <div className='grid grid-cols-4 gap-6'>
                    {relatedProducts.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </div>
            {/* related product */}
        </div>
    );
};

export default ProductsDetailsPage;
