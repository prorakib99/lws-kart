'use server';
import orderSchema from '@/lib/ZodSchema/OrderSchema';
import connectDB from '@/lib/connectDB';
import { getServerSession } from 'next-auth';
import profileAction from '../account/profile';
import addressAction from '../account/address';
import cardInformationAction from '../account/cardInformation';
import Order from '@/models/Order';
import User from '@/models/User';
import generatePDF from '@/lib/GeneratePDF/generatePDF';
import Product from '@/models/Product';
import fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

const orderFormAction = async (form) => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) null;
    const { formData, subTotal, shippingCost, tax, totalAmount, cartsData } = form;

    // Order Form Data
    const orderFormData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: parseInt(formData.get('phone')),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: parseInt(formData.get('zipCode')),
        country: formData.get('country'),
        holderName: formData.get('holderName'),
        cardNumber: formData.get('cardNumber'),
        cvc: formData.get('cvc')
    };

    // Card Information Validation
    const validatedFields = orderSchema.safeParse(orderFormData);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    // User Profile Data
    const userProfile = {
        name: validatedFields.data.name,
        phone: validatedFields.data.phone
    };
    // User Address
    const address = {
        address: validatedFields.data.address,
        city: validatedFields.data.city,
        state: validatedFields.data.state,
        zipCode: validatedFields.data.zipCode,
        country: validatedFields.data.country
    };

    // Card Information
    const cardInformation = {
        holderName: validatedFields.data.holderName,
        cardNumber: validatedFields.data.cardNumber,
        cvc: validatedFields.data.cvc
    };

    console.log(cartsData);

    try {
        await connectDB();

        const [profileInfo, userAddress, cardInfo] = await Promise.all([
            profileAction(userProfile),
            addressAction(address),
            cardInformationAction(cardInformation)
        ]);
        if (profileInfo.success && userAddress.success && cardInfo.success) {
            // Order Confirmation
            const products = cartsData.map((item) => {
                const totalPrice = item.carts.price * item.carts.quantity;
                return {
                    ...item.carts,
                    totalPrice
                };
            });
            const orderConfirm = {
                email: user?.email,
                products,
                subTotal: subTotal,
                shipping: shippingCost,
                tax: tax,
                total: totalAmount
            };
            // Generate PDF
            const pdfBuffer = await generatePDF(orderConfirm);
            const pdfPath = `public/order-confirmation-${Date.now()}.pdf`;

            // Write PDF to file
            const writeFile = await writeFileAsync(pdfPath, pdfBuffer);
            console.log(writeFile);

            // Save Order with PDF Path
            await Order.create({ ...orderConfirm, pdfPath });
            // Carts Empty
            const productIds = cartsData.map(({ carts }) => carts._id);
            await Promise.all([
                User.updateOne({ email: user?.email }, { $set: { carts: [] } }),
                Product.updateMany(
                    {
                        _id: { $in: productIds }
                    },
                    { $set: { availability: true } }
                )
            ]);

            return {
                success: true,
                message: 'Order Confirm Success',
                pdfPath // Return the PDF path to the client
            };
        }
    } catch (error) {
        throw new Error(error);
    }
};

export default orderFormAction;
