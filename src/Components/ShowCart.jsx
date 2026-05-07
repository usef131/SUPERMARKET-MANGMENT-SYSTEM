import { useCart } from "../Context/ProductContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartitemCard from "./CartitemCard";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
function ShowCart() {
    const { cartItems, cartTotalPrices, NumberOfItemsInCart , clearCart , ConfirmCheckout } = useCart();
    const navigate = useNavigate();
    return (
        <>
            <Container>
                <h2 className="bg-dark text-white p-3 w-50 mx-auto text-center mt-4">Shopping Cart</h2>
            </Container>

            <Container className="mt-5">
                <Row>
                    <Col lg="8">
                        <Row>
                            {cartItems.map((product) => (
                                <Col sm="12" lg="6" key={product.id} className="mb-4">
                                    <CartitemCard product={product} />
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    <Col lg="4" className="position-sticky" style={{ top: "20px" }}>
                        <Card className="p-3 shadow rounded-4 border-0">
                            <Card.Body>
                                <Card.Title>
                                    Order Summary
                                    <span className="text-muted"> ({NumberOfItemsInCart})</span>
                                </Card.Title>

                
                                {cartItems.map((product) => (
                                    <Card.Text className="d-flex justify-content-between">
                                        <span>{product.name} <b>x {product.quantity}</b></span>
                                        <span>{(product.price * product.quantity).toFixed(2)} $</span>
                                    </Card.Text>
                                ))}
                            
                            

                                
                                <Card.Text className="d-flex justify-content-between">
                                    <span>Total:</span>
                                    <b>{(cartTotalPrices || 0).toFixed(2)} $</b>
                                </Card.Text>
                                <hr />
                                <div>
                                    <button className="btn btn-success w-100 " disabled={cartItems.length === 0} onClick={ConfirmCheckout}>
                                        Proceed to Checkout
                                    </button>
                                    <button className="btn btn-dark w-100 mt-2" disabled={cartItems.length === 0} onClick={() => navigate('/')}>
                                        Continue Shopping
                                    </button>
                                    <button className ="btn btn-danger w-100 mt-2" onClick={clearCart} disabled={cartItems.length === 0}>
                                        Clear Cart
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ShowCart;