import PageLeftHanding from '@/app/components/Shared/PageLeftHading/PageLeftHanding';
import getUserCarts from '@/app/server/getData/cart/getUserCarts';
import CheckOutForm from './_component/CheckOutForm';
import getAccountInformation from '@/app/server/getData/getAccountInformation';
import { getServerSession } from 'next-auth';

export const metadata = {
    title: 'Checkout | LWSKart',
    description: 'Generated by Checkout Page LWSkart app'
};

const CheckOutPage = async () => {
    const { user } = await getServerSession();
    const carts = await getUserCarts();
    const getAccountInformationRequest = await getAccountInformation();
    const cartsData = JSON.parse(carts);
    const { userProfile, address, cardInformation } = JSON.parse(getAccountInformationRequest);

    // User Account Information
    const accountInformation = {
        userProfile,
        address,
        cardInformation
    };

    return (
        <>
            {/* CheckOut Page Hading */}
            <PageLeftHanding>Checkout</PageLeftHanding>
            {/* CheckOut Page Hading */}

            {/* CheckOut Form */}
            <CheckOutForm
                user={user}
                cartsData={cartsData}
                accountInformation={accountInformation}
            />
        </>
    );
};

export default CheckOutPage;
