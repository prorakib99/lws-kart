import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import methodImg from '@/assets/images/methods.png';
import { getDictionary } from '@/app/[lang]/dictionaries/dictionaries';

// socialMedia Items
const socialMedias = [
    {
        icon: <FaFacebook />,
        url: '#'
    },
    {
        icon: <FaInstagram />,
        url: '#'
    },
    {
        icon: <FaTwitter />,
        url: '#'
    },
    {
        icon: <FaGithub />,
        url: '#'
    }
];

const Footer = async ({ lang }) => {
    const { footer } = await getDictionary(lang);

    return (
        <>
            <footer className='py-5 bg-white border-t border-gray-100 sm:py-10'>
                <div className='container grid items-start justify-center grid-cols-1 gap-5 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:justify-between xl:grid-cols-5'>
                    <div className='sm:space-y-5'>
                        <Image
                            src={logo}
                            alt='logo'
                            className='w-[12.5rem] h-[5rem]'
                            priority={true}
                            width={180}
                            height={70}
                        />
                        <div className='flex flex-wrap items-center gap-3'>
                            {/* Social Media */}
                            {socialMedias.map((item, index) => (
                                <Link
                                    target='_blank'
                                    className='p-3 text-gray-600 bg-gray-200 rounded-full hover:text-gray-500'
                                    href={item.url}
                                    key={index}
                                >
                                    <span className='text-xl'>{item.icon}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className='text-sm font-semibold tracking-wider text-gray-400 uppercase'>
                            {footer.heading.solutions}
                        </h3>
                        <div className='mt-4 space-y-4'>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.solutions.marketing}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.solutions.analytics}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.solutions.commerce}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.solutions.insights}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-sm font-semibold tracking-wider text-gray-400 uppercase'>
                            {footer.heading.support}
                        </h3>
                        <div className='mt-4 space-y-4'>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.support.pricing}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.support.documentation}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.support.guides}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.support.api_status}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-sm font-semibold tracking-wider text-gray-400 uppercase'>
                            {footer.heading.solutions}
                        </h3>
                        <div className='mt-4 space-y-4'>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.solutions.marketing}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.solutions.analytics}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.solutions.commerce}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.solutions.insights}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-sm font-semibold tracking-wider text-gray-400 uppercase'>
                            {footer.heading.support}
                        </h3>
                        <div className='mt-4 space-y-4'>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.support.pricing}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.support.documentation}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.support.guides}
                            </span>
                            <span className='block text-base text-gray-500 hover:text-gray-900'>
                                {footer.support.api_status}
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
            {/* ./footer */}

            {/* copyright */}
            <div className='py-4 bg-gray-800'>
                <div className='container flex flex-col items-center justify-between gap-2 sm:flex-row'>
                    <p className='text-white'>{footer.copy_right}</p>
                    <div>
                        <Image
                            src={methodImg}
                            className='w-auto h-auto'
                            alt='methods'
                            width={150}
                            height={60}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
