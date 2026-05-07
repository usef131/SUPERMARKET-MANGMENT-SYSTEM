import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useCart } from '../Context/ProductContext';
import {toast} from 'react-toastify';
function ProductCard({ product }) {

    const {addToCart} = useCart();

    return (
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
                <Button variant="dark" onClick={() => addToCart(product) }>
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;