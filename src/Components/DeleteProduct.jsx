import Container from 'react-bootstrap/Container';
import { useCart } from '../Context/ProductContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from './ProductCard';
import { useProducts } from '../Hooks/useProducts';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert2';
function DeleteProduct() {
    const { deleteProduct } = useCart();
    const { data, setData } = useProducts("http://localhost:3000/products");


    return (
        <>
            <Container className="mt-3">
                <h2 className="bg-dark text-white p-3 w-50 mx-auto text-center mt-4">
                    Delete Product
                </h2>
            </Container>

            <Container className="mt-5">
                <Row>
                    {
                        data.map((product) => (
                            <Col sm="12" lg="4" key={product.id} className="mb-4">
                                <Card style={{ width: '20rem' }} >
                                    <Card.Img variant="top" src={product.img} width={100} height={250} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            {product.price} $
                                        </Card.Text>
                                        <Card.Text>
                                            {product.category}
                                        </Card.Text>
                                        <Button variant="danger" onClick={() => {
                                            swal.fire({
                                                title: 'Are you sure?',
                                                text: "You won't be able to revert this!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3eb517',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'delete'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    deleteProduct(product);
                                    
                                                    swal.fire({
                                                       title: 'product deleted successfully',
                                                       icon: 'success'
                                                    }
                                                    )
                                                     setData(data.filter((item) => item.id !== product.id));

                                                }
                                            })
                                            
                                           
                                        }}>
                                            Delete Product
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    );
}

export default DeleteProduct;