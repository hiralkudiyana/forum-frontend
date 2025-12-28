import { Accordion } from "react-bootstrap";
import ThreadRow from "./ThreadRow";

export default function ForumCategory({ category, index }) {
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>{category.name}</Accordion.Header>

      <Accordion.Body className="p-0">
        {category.posts.length === 0 ? (
          <div className="p-3 text-muted">No posts yet</div>
        ) : (
          category.posts.map((post) => (
            <ThreadRow key={post.id} post={post} />
          ))
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}
