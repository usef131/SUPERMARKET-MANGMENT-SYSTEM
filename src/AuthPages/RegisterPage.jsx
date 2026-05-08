import  { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


   const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.get("http://localhost:3000/Users");

    // check if email exists
    const exist = res.data.find(
      (user) => user.email === formData.email
    );

    if (exist) {
      alert("Email already exists!");
      return;
    }

    // check password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = formData;

    // send only real user data
    await axios.post("http://localhost:3000/Users", userData);

    alert("Account created successfully!");

   navigate("/", { replace: true });
    window.location.reload();
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
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
                                    {/* Username */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Enter your username"
                                            size="lg"
                                            value={formData.username}
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

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                 <label>
                                   <input
                                    type="radio"
                                   name="role"
                                   value="manager"
                                   checked={formData.role === "manager"}
                                  onChange={handleRoleChange}
                                      />
                                  Manager
                                    </label>

                                     <label>
                                  <input
                                       type="radio"
                                    name="role"
                                      value="cashier"
                                      checked={formData.role === "cashier"}
                                    onChange={handleRoleChange}
                                      />
                                Cashier
                               </label>
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