"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import { BsCart3 } from "react-icons/bs";
import { IProduct } from "@/lib/products";
import axios from "axios";

interface props {
  email: string;
  name: string;
  items: (IProduct & {
    quantity: number;
  })[];
}

export function Checkout({ email, name, items }: props) {
  const [modalToggle, setModalToggle] = useState(false); // This state variable is used for sending put request to update cart items before proceeding.
  useEffect(() => {
    const updateItems = async () => {
      console.log("ITEMS: ");
      console.log(items);
      if (items === undefined) return;
      const reqBody = {
        email,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };
      const res = await axios.put("/api/cart", reqBody);
      if (res.status !== 200) {
        alert("Failed to update cart. Please try again later.");
      }
    };
    updateItems();
  }, [modalToggle]);
  return (
    <Modal>
      <ModalTrigger className=" bg-green-500 text-white  flex justify-center group/modal-btn">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          Checkout
        </span>
        <div
          onClick={() => {
            setModalToggle((prev) => !prev);
          }}
          className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20"
        >
          <BsCart3 />
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="name">Phone Number</label>
              <input
                name="phone"
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="+91-X-XXXX-XXXX"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="">Address</label>
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
            Proceed
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
