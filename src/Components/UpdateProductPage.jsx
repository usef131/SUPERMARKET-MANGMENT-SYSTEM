import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useProducts } from '../Hooks/useProducts';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function UpdateProductPage() {
    const { data } = useProducts("http://localhost:3000/products");
    const navigate = useNavigate();

    return (
        <>
            <Container className="mt-3">
                <h2 className="bg-dark text-white p-3 w-50 mx-auto text-center mt-4">
                    Update Product
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
                                        <Button variant="warning"  onClick = {() => navigate(`/update-product-logic/${product.id}`)}>
                                            Update Product
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

export default UpdateProductPage;