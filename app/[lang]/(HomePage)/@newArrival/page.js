import Product from '@/app/components/Product/Product';
import getNewArrival from '@/app/server/getData/getNewArrival';
import { getDictionary } from '../../dictionaries/dictionaries';

const NewArrivalSection = async ({ params: { lang } }) => {
    const req = await getNewArrival();
    const products = JSON.parse(req);
    // Language
    const {
        home_page: { top_new_arrival_section }
    } = await getDictionary(lang);

    return (
        <div>
            <div className='container pb-16'>
                <h2 className='mb-6 text-2xl font-medium text-gray-800 uppercase'>
                    {top_new_arrival_section.top_new_arrival}
                </h2>
                <div className='grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewArrivalSection;
