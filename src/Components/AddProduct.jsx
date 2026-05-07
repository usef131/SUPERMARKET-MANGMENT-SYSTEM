import Container from 'react-bootstrap/Container';
import { useCart } from '../Context/ProductContext';
import { useState } from 'react';
import { toast } from 'react-toastify';


function AddProduct() {

    const { addProduct } = useCart();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        stock: ""
    });

    const SubmitForm = (event) => {
        event.preventDefault();

        const { name, category, price, stock , image} = product;

        if (!name || !category || !price || !stock || !image) {
            toast.error("Please fill in all fields", {
                position: "top-right",
                autoClose: 1000,
            });
            return;
        }

        addProduct(product);

        toast.success("Product added successfully", {
            position: "top-right",
            autoClose: 1000,
        });

        setProduct({
            name: "",
            category: "",
            price: "",
            stock: "",
            image: ""
        });
    };

    return (
        <>
            <Container className="mt-3">
                <h2 className="bg-dark text-white p-3 w-50 mx-auto text-center mt-4">
                    Add New Product
                </h2>
            </Container>

            <Container>
                <form className="w-50 mx-auto mt-4 shadow p-4 rounded" onSubmit={SubmitForm}>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.name}
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.category}
                            onChange={(e) =>
                                setProduct({ ...product, category: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            value={product.price}
                            onChange={(e) =>
                                setProduct({ ...product, price: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            value={product.stock}
                            onChange={(e) =>
                                setProduct({ ...product, stock: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.image}
                            onChange={(e) =>
                                setProduct({ ...product, image: e.target.value })
                            }
                        />
                    </div>

                    <button type="submit" className="btn btn-success mt-3">
                        Add Product
                    </button>
                </form>
            </Container>
        </>
    );
}

export default AddProduct;