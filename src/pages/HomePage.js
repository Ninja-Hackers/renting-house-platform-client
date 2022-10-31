import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function HomePage() {
  return (
    <div>
      <Form className='d-flex'>
        <Form.Control
          type='search'
          placeholder='Search'
          className='me-2'
          aria-label='Search'
        />
        <Button variant='outline-success'>Search</Button>
      </Form>
      <div className='home-page'>
        <h1>Home page</h1>
      </div>
    </div>
  );
}

export default HomePage;
