import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../Context/ProductContext';
function CartitemCard({ product }) {

    const {removeFromCart, updateQuantity} = useCart();
    return (
        <>

            <Card style={{ width: '20rem' }} >
            <Card.Img variant="top" src={product.img} width={75} height={200} />
            <Card.Body>
                <Card.Title >{product.name}</Card.Title>
                <Card.Text>
                    <b>Price:</b> {product.price} $
                     <span className = "ms-5"><b>Quantity:</b> {product.quantity}</span>
                </Card.Text>
                <Button variant="danger" className="ms-2" onClick={() => removeFromCart(product.id)}>
                    Remove from Cart
                </Button>
                <Button variant = "dark" className="ms-2" onClick={() => updateQuantity(product.id, product.quantity ? product.quantity + 1 : 1)}>
                    +
                </Button>
                <Button variant = "dark" className="ms-2" onClick={() => updateQuantity(product.id, product.quantity > 1 ? product.quantity - 1 : 1)}>
                    -
                </Button>
            </Card.Body>
        </Card>
        </>
    );
}

export default CartitemCard;