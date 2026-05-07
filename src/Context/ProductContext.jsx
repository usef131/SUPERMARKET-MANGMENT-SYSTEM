import { createContext, useContext } from "react";
import { toast } from 'react-toastify'
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import swal from "Sweetalert2";
const CartContext = createContext();

const url = "http://localhost:3000/products";

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useLocalStorage("cart", [])

    // Add To Cart
    const addToCart = (product) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return prevCartItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevCartItems, { ...product, quantity: 1 }];
        });
        toast.success('Product added to cart!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
        });
    };
    // Remove Item From Cart
    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        toast.success('Product removed from cart!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
        });
    }
    // Clear Cart
    const clearCart = () => {
        setCartItems([]);
        toast.success('Cart cleared!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
        });
    }

    // Get Total Prices
    const cartTotalPrices = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const updateQuantity = (id, newQty) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === id) {
                // return item with updated quantity
                return { ...item, quantity: newQty }
            }
            return item;
        })
        setCartItems(updatedCart);
    };

    const NumberOfItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    const addProduct = async (newProduct) => {

        const response = await axios.post(url, newProduct);
        return response;
    };
    const deleteProduct = async (product) => {
        const response = await axios.delete(`${url}/${product.id}`);

        return response;
    }
    
    const ConfirmCheckout =() => {
         swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, checkout!'
          }).then((result) => {
            if (result.isConfirmed) {
                swal.fire(
                'Checked out!',
                'Your order has been placed.',
                'success'              )
                clearCart();
            }
            })
    }


    const values = {
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartItems,
        cartTotalPrices,
        NumberOfItemsInCart,
        addProduct,
        deleteProduct,
        ConfirmCheckout
    }

    return <>
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    </>
}


export default CartProvider;