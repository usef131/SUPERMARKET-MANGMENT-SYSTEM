import Container from 'react-bootstrap/Container';
import { useCart } from '../Context/ProductContext';
import { useState, useEffect } from 'react';
import  {toast}  from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UpdateProductLogic() {

    const [product, setProduct] = useState({});
    const id = useParams().id;
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);



    const { UpdateProduct } = useCart();



    const SubmitForm = (event) => {
        event.preventDefault();

        const { name, category, price, stock } = product;

        if (!name || !category || !price || !stock) {
              swal.fire({
                title : "Complete all fields",
                icon: 'error'
              })
        }

        UpdateProduct(product);

        toast.success("Product updated successfully", {
            position: "top-right",
            autoClose: 1000,
        });
        
        navigate('/')
    };

    return (
        <>
            <Container className="mt-3">
                <h2 className="bg-dark text-white p-3 w-50 mx-auto text-center mt-4">
                    Update Product
                </h2>
            </Container>

            <Container>
                <form className="w-50 mx-auto mt-4 shadow p-4 rounded" onSubmit={SubmitForm}>

                    <div className="mb-3">
                        <label htmlFor='name' className="form-label fw-bold">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.name}
                            id = "name"
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor = 'category' className="form-label fw-bold">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            value={product.category}
                            id = "category"
                            onChange={(e) =>
                                setProduct({ ...product, category: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor = "price" className="form-label fw-bold">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id = "price"
                            value={product.price}
                            onChange={(e) =>
                                setProduct({ ...product, price: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='stock' className="form-label fw-bold">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id = "stock"
                            value={product.stock}
                            onChange={(e) =>
                                setProduct({ ...product, stock: e.target.value })
                            }
                        />
                    </div>



                    <button type="submit" className="btn btn-success mt-3">
                        Update Product
                    </button>
                </form>
            </Container>
        </>
    );
}

export default UpdateProductLogic;