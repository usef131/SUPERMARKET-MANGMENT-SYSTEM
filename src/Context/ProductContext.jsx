import { createContext, useContext } from "react";
import { toast } from 'react-toastify'
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import swal from "sweetalert2";
import { useProducts } from "../Hooks/useProducts";
const CartContext = createContext();

const url = "http://localhost:3000/products";

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useLocalStorage("cart", [])
    const { fetchProducts } = useProducts(url);

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

        fetchProducts();
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
        fetchProducts();
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
            confirmButtonColor: '#3eb517',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm Checkout'
          }).then((result) => {
            if (result.isConfirmed) {
                    decreaseStockOnCheckout();
                swal.fire(
                'Checked out!',
                'Your order has been placed.',
                'success')

                 saveOrderLog({
                    products: cartItems,
                    totalPrice: cartTotalPrices.toFixed(2),
                    dateTime: new Date().toISOString(),
                    CashierUserName: JSON.parse(localStorage.getItem("user"))?.username || "Unknown Cashier"
                });
                clearCart();
            }
            })
    }


    
    const UpdateProduct = async (updatedProduct) => {

        const response = await axios.put(`${url}/${updatedProduct.id}`, updatedProduct);
        return response;
    }

    const saveOrderLog = async (orderDetails) => {
        const response = await axios.post("http://localhost:3000/OrdersLog", orderDetails);
        return response;
    }

    const updatedStock = async (productId, quantity) => {
        try {
            const response = await axios.get(`${url}/${productId}`);
            const product = response.data;
            let newStock = product.stock

            if(quantity > product.stock) {
                throw new Error("Not enough stock available");
            }
            else{
            newStock = product.stock - quantity;
            }

            if (newStock < 0) {
                newStock = product.stock;
                throw new Error("Not enough stock available");
            }

            await axios.put(`${url}/${productId}`, { ...product, stock: newStock });
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    }

    const decreaseStockOnCheckout = async () => {
        for (const item of cartItems) {
            await updatedStock(item.id, item.quantity);
        }
    }

   const isStockAvailable = (product) => {
    const safeCart = cartItems || [];

    const cartItem = safeCart.find((item) => item.id === product.id);

    const quantityInCart = cartItem?.quantity || 0;

    return Number(product.stock) > quantityInCart;
};
    

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
        ConfirmCheckout,    
        UpdateProduct,
        isStockAvailable
    }

    return <>
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    </>
}


export default CartProvider;