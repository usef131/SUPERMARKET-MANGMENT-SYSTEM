import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // Register Logic
        console.log(formData);
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center "
            style={{
                minHeight: "100vh",
                background: "white",
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card
                            className="shadow-lg border-0 "
                            style={{ borderRadius: "20px" }}

                        >
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold">Create Account</h2>
                                    <p className="text-muted">
                                        Register to get started
                                    </p>
                                </div>

                                <Form onSubmit={handleRegister}>
                                    {/* Full Name */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            size="lg"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            style={{ borderRadius: "12px" }}
                                            required
                                        />
                                    </Form.Group>

                                    {/* Email */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            size="lg"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ borderRadius: "12px" }}
                                            required
                                        />
                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Create password"
                                            size="lg"
                                            value={formData.password}
                                            onChange={handleChange}
                                            style={{ borderRadius: "12px" }}
                                            required
                                        />
                                    </Form.Group>

                                    {/* Confirm Password */}
                                    <Form.Group className="mb-4">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                            size="lg"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            style={{ borderRadius: "12px" }}
                                            required
                                        />
                                    </Form.Group>

                                    {/* Terms */}
                                    <div className="mb-4">
                                        <Form.Check
                                            type="checkbox"
                                            label="I agree to the Terms & Conditions"
                                            required
                                        />
                                    </div>

                                    {/* Register Button */}
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
                                        Register
                                    </Button>
                                </Form>

                                {/* Login Link */}
                                <div className="text-center mt-4">
                                    <span className="text-muted">
                                        Already have an account?
                                    </span>{" "}
                                    <a
                                        href="/"
                                        className="text-decoration-none fw-semibold"
                                    >
                                        Login
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}