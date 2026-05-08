import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ManagerProductCard from "../Components/ManagerProductCard";
import { useProducts } from "../Hooks/useProducts";
import Spinner from 'react-bootstrap/Spinner';
function ManagerHomePage() {
    const url = "http://localhost:3000/products";
    const { data, loading, error } = useProducts(url);

    return (
        <>
            <div>
                {
                    loading &&

                    <h2 className="text-center mt-5">
                        <Spinner animation="border" role="status" />
                    </h2>
                }
                {
                    error &&
                    <h2 className="text-center mt-5 text-danger border border-warning bg-warning rounded p-3 w-50 mx-auto">{error}</h2>
                }
            </div>
            <header className="bg-dark text-white text-center py-3 mb-4 mx-auto rounded shadow-sm w-25 mt-4">
                <h1 className="text-center">Welcome to Our Store </h1>
                <h5 className="text-center">Manager Home Page</h5>
            </header>
            <Container className="mt-5">
                <Row>
                    {
                        data.map((product) => (
                            <Col sm="12" lg="4" key={product.id} className="mb-4">
                                <ManagerProductCard product={product} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>

        </>
    );
}

export default ManagerHomePage;