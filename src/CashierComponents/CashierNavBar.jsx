import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCart } from '../Context/ProductContext';
import Badge from 'react-bootstrap/Badge';
import { useAuth } from "../Context/AuthContext.jsx";

function CashierNavBar() {

    const { NumberOfItemsInCart } = useCart();

    const {Logout} = useAuth();

        const handleLogout = () => {
                Logout();
            }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/CashierHomePage">
                        <i className='fa-brands fa-react'></i> React Market
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/CashierHomePage"><i className="bi bi-house me-2 "></i>Home</Nav.Link>

                        <Nav.Link href="/cart">
                            <i className="bi bi-cart me-2">
                                <Badge bg="secondary" pill className="position-absolute  translate-middle" >
                                    {NumberOfItemsInCart}
                                </Badge>
                            </i>
                            Cart

                        </Nav.Link>
                        <Nav.Link href="#" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default CashierNavBar;