import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <Row>
          {/* Left side */}
          <Col>
            <strong>FORUM</strong>
          </Col>

          {/* Right side */}
          <Col className="text-end">
            © {new Date().getFullYear()} FORUM. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
