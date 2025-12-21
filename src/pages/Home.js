import { Container, Accordion } from "react-bootstrap";
import ForumCategory from "../components/ForumCategory";
import { forumCategories } from "../data/forumData";

export default function Home() {
  return (
    <Container className="mt-4">
      <h3 className="mb-4">Forum</h3>

      <Accordion defaultActiveKey="0">
        {forumCategories.map((category, index) => (
          <ForumCategory
            key={index}
            category={category}
            index={index}
          />
        ))}
      </Accordion>
    </Container>
  );
}
