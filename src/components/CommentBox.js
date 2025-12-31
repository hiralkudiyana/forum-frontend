import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CommentBox({ isLoggedIn,isBanned,isloading }) {
  if(isloading){
    return (
      <Card className="mb-4">
        <Card.Body className="text-center">
            <Spinner animation="border" />
        </Card.Body>
      </Card>
    );
  }
  if (!isLoggedIn) {
    return (
      <Card className="mb-4">
        <Card.Body className="text-center">
          <strong>
            Please <Link to="/login">Login</Link> or{" "}

            <Link to="/register">Sign up</Link> to add a comment.
          </strong>
        </Card.Body>
      </Card>
    );
  }

  if (isBanned) {
    return (
      <Card className="mb-4">
        <Card.Body>
          <Alert variant="danger" className="mb-0">
            You are banned and cannot post comments.Kindly Contact Admin.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Write your comment here..."
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="primary">Post Comment</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
