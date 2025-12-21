import { Accordion } from "react-bootstrap";
import ThreadRow from "./ThreadRow";

export default function ForumCategory({ category, index }) {
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>{category.title}</Accordion.Header>
      <Accordion.Body className="p-0">
        {category.forums.map((forum, i) => (
          <ThreadRow key={i} forum={forum} />
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
}
