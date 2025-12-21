import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ThreadRow({ forum }) {
  return (
    <Row className="py-3 border-bottom align-items-center">
      <Col md={5} style={{paddingLeft: 30}}>
        <h6 className="mb-1">
          <Link to="/forum/1">{forum.name}</Link>
        </h6>
        <small className="text-muted">Sub-forum</small>
      </Col>

      <Col md={2} className="text-center">
        <div>Threads</div>
        <strong>{forum.threads}</strong>
      </Col>

      <Col md={2} className="text-center">
        <div>Messages</div>
        <strong>{forum.messages}</strong>
      </Col>

      <Col md={3}>
        <div>{forum.lastPost}</div>
        <small className="text-muted">
          {forum.time} · {forum.user}
        </small>
      </Col>
    </Row>
  );
}
