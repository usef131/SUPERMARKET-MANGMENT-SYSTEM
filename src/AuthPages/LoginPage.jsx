import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
} from "react-bootstrap";

import { useAuth } from "../Context/AuthContex";
import { Link } from "react-router-dom";
export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role , setRole] = useState("")
    
    const {CheckManager} = useAuth();

    
    const handleLogin = (e) => {
        e.preventDefault();

        //  login logic 
        CheckManager(email , password , role)
        
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: "100vh",
                background: "white",
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card
                            className="shadow-lg border-0"
                            style={{ borderRadius: "20px" }}
                        >
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold">Welcome Back</h2>
                                    <p className="text-muted">
                                        Login to your account
                                    </p>
                                </div>

                                <Form onSubmit={handleLogin}>
                                    {/* Email */}
                                    <Form.Group className="mb-4">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            size="lg"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{ borderRadius: "12px" }}
                                            required
                                        />
                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            size="lg"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ borderRadius: "12px" }}
                                            required
                                        />
                                    </Form.Group>

                                    {/* Remember + Forgot */}
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Form.Check
                                            type="radio"
                                            label="Manager"
                                            name="role"
                                            value="manager"
                                            checked={role === "manager"}
                                            onChange={(e) => setRole(e.target.value)}
                                        />

                                        <Form.Check
                                            type="radio"
                                            label="Cashier"
                                            name="role"
                                            value="cashier"
                                            checked={role === "cashier"}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <a
                                            href="#"
                                            className="text-decoration-none"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>

                                    {/* Login Button */}
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="lg"
                                        className="w-100"
                                        style={{
                                            borderRadius: "12px",
                                            padding: "12px",
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Form>

                                {/* Signup */}
                                <div className="text-center mt-4">
                                    <span className="text-muted">
                                        Don’t have an account?
                                    </span>{" "}
                                    <Link to="/Register">
                                        Sign up
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}