"use client";
import Modal from "@/app/components/Modal/Modal";
import SubmitButton from "@/app/components/SubmitButton/SubmitButton";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { toast } from "sonner";
import FormControl from "../FormControl";
import addressAction from "@/app/server/actions/account/address";

const AddressAddButton = ({ name, address }) => {
    const [open, setOpen] = useState(false);

    const handleAddress = async (formData) => {
        try {
            const address = await addressAction(formData);
            if (address.success) {
                toast.success(address.message)
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    console.log(address);
    return (
        <>
            <Modal open={open} setOpen={setOpen} name={name} hading="Shipping address">
                <form action={handleAddress}>
                    <Flex direction="column" gap="3">
                        <FormControl defaultValue={address?.address || ""} label="Address" type="text" name="address" />
                        <FormControl defaultValue={address?.city || ""} label="City" type="text" name="city" />
                        <FormControl defaultValue={address?.state || ""} label="State" type="text" name="state" />
                        <FormControl defaultValue={address?.country || ""} label="Country" type="text" name="country" />
                        <FormControl defaultValue={address?.zipCode || ""} label="Zip Code" type="number" name="zipCode" />
                    </Flex>
                    <div className="mt-4">
                        <SubmitButton>
                            Save
                        </SubmitButton>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddressAddButton;