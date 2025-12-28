import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ThreadRow({ post }) {
  return (
    <Row className="py-3 border-bottom align-items-center">
      <Col md={9} style={{ paddingLeft: 30 }}>
        <h6 className="mb-1">
          <Link to={`/forum/${post.id}`}>
            {post.title}
          </Link>
        </h6>
      </Col>

      <Col md={3} className="text-center">
        <div>Comments</div>
        <strong>0</strong>
      </Col>


 
    </Row>
  );
}
