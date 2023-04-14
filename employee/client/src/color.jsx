import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Axios from "axios";


function EmployeeForm() {

// Form data
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    primaryContactName: '',
    primaryContactPhoneNumber: '',
    primaryContactRelationship: '',
    secondaryContactName: '',
    secondaryContactPhoneNumber: '',
    secondaryContactRelationship: '',
  }); 

  // On Change handler
  const handleChange = (e) => {
    // const { name, value } = e.target;
    // e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


  const [employeeList, setEmployeeList] = useState([]);


  // POSt request to add employees from api /create

  const addEmployee = async (e) => {
    // e.preventDe fault();
     await fetch("http://localhost:3001/create", {
        method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },body: JSON.stringify({
                    name:       formData.fullName ,     
                    title:      formData.jobTitle ,
                    phone:      formData.phoneNumber ,
                    email:      formData.email ,
                    adress:     formData.address ,
                    city:       formData.city ,
                    state:      formData.state ,
                    priEcon:    formData.primaryContactName ,
                    ph1:        formData.primaryContactPhoneNumber ,
                    rel1:       formData.primaryContactRelationship ,
                    secEcon:    formData.secondaryContactName ,
                    ph2:        formData.secondaryContactPhoneNumber ,
                    rel2:       formData.secondaryContactRelationship , 
                })     
    }) 

      };
// Get Employees  from API /employees

      const getEmployees = () => {
        Axios.get("http://localhost:3001/employees").then((response) => {
          setEmployeeList(response.data);
        });
      };



//   //Update employee from API /update
//   const update = async (id,name,title,phone,email,adress,city,state,priEcon,ph1,rel1,secEcon,ph2,rel2)=>{
//     //API Call 
//   const response = await fetch(`http://localhost:3001/update/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//     },
//       body: JSON.stringify({
//                     name:       name,     
//                     title:      title ,
//                     phone:      phone ,
//                     email:      email ,
//                     adress:     adress ,
//                     city:       city ,
//                     state:      state ,
//                     priEcon:    priEcon ,
//                     ph1:        ph1 ,
//                     rel1:       rel1 ,
//                     secEcon:    secEcon ,
//                     ph2:        ph2 ,
//                     rel2:       rel2 , 
//       })
//     });
//     const json = response.json({
//                     name:      name ,     
//                     title:     title ,
//                     phone:     phone ,
//                     email:     email ,
//                     adress:    adress ,
//                     city:      city ,
//                     state:     state ,
//                     priEcon:   priEcon ,
//                     ph1:       ph1 ,
//                     rel1:      rel1 ,
//                     secEcon:   secEcon ,
//                     ph2:       ph2 ,
//                     rel2:      rel2 , 
//     })
//     console.log(json)
//     let newData =  JSON.parse(JSON.stringify(employeeList))
//   //  Logic to edit
//     for(let i = 0; i <= newData.length; i++){
//         const ele = newData[i];
//         if( ele.id === id ){
//           // newData[i].name =    name ,     
//           newData[i].title =      title ,
//           newData[i].phone =      phone ,
//           newData[i].email =      email ,
//           newData[i].adress =     adress ,
//           newData[i].city =       city ,
//           newData[i].state =      state ,
//           newData[i].priEcon =    priEcon ,
//           newData[i].ph1 =        ph1 ,
//           newData[i].rel1 =       rel1 ,
//           newData[i].secEcon =    secEcon ,
//           newData[i].ph2 =        ph2 ,
//           newData[i].rel2 =       rel2 
//           break;
//         }
//     }
//     setEmployeeList(newData)

// }

// delete an employee record
const deleteemp = async (id)=>{
 console.log(id);
    //API Call 
const response = await fetch(`http://localhost:3001/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
        },
 });
      const json = response.json()
      console.log("delted ", json)

console.log("deleting: "+ id);
const newData = employeeList.filter((employeeList)=>(employeeList.id!== id)) 
setEmployeeList(newData);
}


  // Pagination nodes

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(employeeList.length / itemsPerPage);

  // slice the data array to show only the items for the current page
  const displayedItems = employeeList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // handle the page navigation buttons
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };








  return (
    <Container className="my-5 py-3" style={{ backgroundColor: '#f9f9f9' }}>
      <h1 className="text-center mb-4">Employee Contact Form</h1>
      <Form onSubmit={addEmployee}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <h3 className="mb-3">Emergency Contacts</h3>
        <Row>
          <Col md={6}>
            <Form.Group controlId="primaryContactName">
              <Form.Label>Primary Emergency Contact Name</Form.Label>
              <Form.Control type="text" name="primaryContactName" value={formData.primaryContactName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="primaryContactPhoneNumber">
              <Form.Label>Primary Emergency Contact Phone Number</Form.Label>
              <Form.Control type="number" name="primaryContactPhoneNumber" value={formData.primaryContactPhoneNumber} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="primaryContactRelationship">
              <Form.Label>Primary Emergency Contact Relationship</Form.Label>
              <Form.Control type="text" name="primaryContactRelationship" value={formData.primaryContactRelationship
          } onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="secondaryContactName">
            <Form.Label>Secondary Emergency Contact Name</Form.Label>
            <Form.Control type="text" name="secondaryContactName" value={formData.secondaryContactName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="secondaryContactPhoneNumber">
            <Form.Label>Secondary Emergency Contact Phone Number</Form.Label>
            <Form.Control type="number" name="secondaryContactPhoneNumber" value={formData.secondaryContactPhoneNumber} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="secondaryContactRelationship">
            <Form.Label>Secondary Emergency Contact Relationship</Form.Label>
            <Form.Control type="text" name="secondaryContactRelationship" value={formData.secondaryContactRelationship} onChange={handleChange} required />
          </Form.Group> 
        </Col>
      </Row>
      <Button variant="primary" type = "submit" className=" mt-4">Submit</Button>
    </Form>

    <div>
        <Button variant="primary"  type="submit" onClick={getEmployees} className=" mt-4">Show Employees</Button>
    </div>
    <br /><hr />
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Primary E-contact</th>
          <th>Phone</th>
          <th>Realtionship</th>
          <th>Secondary E-contact</th>
          <th>Phone</th>
          <th>Realtionship</th>
        </tr>
      </thead>
      <tbody>
        {displayedItems.map((item, index) => (
          <tr key={index}>
            {/* <td>{index + 1}</td> */}
            <td>{item.name}</td>
            <td>{item.title}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.adress}</td>
            <td>{item.city}</td>
            <td>{item.state}</td>
            <td>{item.priEcon}</td>
            <td>{item.ph1}</td>
            <td>{item.rel1}</td>
            <td>{item.secEcon}</td>
            <td>{item.ph2}</td>
            <td>{item.rel2}</td>
            <td>
              <Button variant="primary" >Edit</Button>{' '}
              <Button variant="danger" onClick={() => {deleteemp(item.id)}}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <div>
        <Button variant="secondary" onClick={handlePreviousPage}>
          Previous Page
        </Button>{" "}
        <Button variant="secondary" onClick={handleNextPage}>
          Next Page
        </Button>{" "}
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
  </Container>
);
} 

export default EmployeeForm;  