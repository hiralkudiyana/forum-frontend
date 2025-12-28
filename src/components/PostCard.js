import { Card, Row, Col, Badge } from "react-bootstrap";

export default function PostCard({ post }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col md={2} className="text-center">
            <div
              className="rounded-circle bg-success text-white mx-auto mb-2"
              style={{ width: 60, height: 60, lineHeight: "60px" }}
            >
              {post.user.charAt(0)}
            </div>
            <strong>{post.user}</strong>
          </Col>

          <Col md={10}>
            <small className="text-muted">{post.date}</small>
            <p className="mt-2">{post.content}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
