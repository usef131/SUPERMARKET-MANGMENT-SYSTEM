import Card from 'react-bootstrap/Card';
function ProductCard({ product }) {


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
            </Card.Body>
        </Card>
    );
}

export default ProductCard;