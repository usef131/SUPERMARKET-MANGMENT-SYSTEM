import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { useCart } from '../Context/ProductContext';
function Navigation() {
    const { NumberOfItemsInCart } = useCart();
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/Home">
                        <i className='fa-brands fa-react'></i> React Market
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/Home"><i className="bi bi-house me-2"></i>Home page</Nav.Link>
                        <Nav.Link href="/cart">
                            <i className="bi bi-cart me-2">
                                <Badge bg="secondary" pill className="position-absolute  translate-middle" >
                                    {NumberOfItemsInCart}
                                </Badge>
                            </i>
                            Cart

                        </Nav.Link>
                         <Nav.Link href="/add-product"><i className="bi bi-plus-circle me-2"></i>Add Product</Nav.Link>
                        <Nav.Link href="/delete-product"><i className="bi bi-trash me-2"></i>Delete Product</Nav.Link>
                        <Nav.Link href="/update-product-page"><i className="bi bi-pencil me-2"></i>Update Product</Nav.Link>
                        <Nav.Link href="/contact"><i className="bi bi-envelope me-2"></i>Contact me</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;