"use client";
import addToCart from "@/app/server/actions/addtocart";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

const AddToCart = ({ productId, alreadyCart, className, children }) => {
    const searchParams = useSearchParams();

    const handleAddToCart = useCallback(async () => {
        const searchParamsQuantity = searchParams.get('quantity') || 1;
        try {
            const addCart = await addToCart(productId, searchParamsQuantity);
            if (addCart?.success) {
                toast.success(addCart.message);
            }
        } catch (error) {
            toast.error(error?.message || "An error occurred while adding to cart.");
        }
    }, [productId, searchParams]);

    return (
        <button
            disabled={alreadyCart}
            onClick={handleAddToCart}
            className={`flex items-center justify-center w-full gap-2 py-2 font-medium text-white uppercase transition-colors border rounded bg-primary border-primary hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:bg-gray-400/20 disabled:text-gray-500/70 disabled:border-gray-400/25 ${className ? className : ""}`}
        >
            {children}
        </button>
    );
};

export default AddToCart;