'use server';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const addWishlist = async (productId, email) => {
    const session = await getServerSession();

    if (!email && !session?.user) {
        redirect(`/login?wishlist=true&productId=${productId}`);
    }

    try {
        await connectDB();

        const userEmail = email || session?.user?.email;
        const userData = await User.findOne({ email: userEmail });
        if (!userData) {
            throw new Error('User not found');
        }
        // Check if the wishlist item already exists
        if (!userData.wishlists.includes(productId)) {
            userData.wishlists.push(productId);
            await userData.save();
        }
    } catch (error) {
        return { error: true, message: error.message };
    }

    revalidatePath('/', 'page');
    return { success: true, message: 'Wishlist added successfully' };
};

export default addWishlist;
