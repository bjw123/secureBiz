import React, {useEffect, useState} from "react";
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Container,
    Form, FormGroup, Label, Input, FormText
} from "reactstrap";

const Question = (onEdit:any, onDelete:any) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);

    const [editModal, setEditModal] = useState(false);

    const toggleEditModal = () => setEditModal(!modal);

    return (
        <React.Fragment>
        <tr>
            <th scope="row" >1</th>
            <td>Do you have x running as a service when using ms office</td>
            <td>
                <Button
                    color="primary"
                    href="#pablo"
                    onClick={(e: { preventDefault: () => any; }) => e.preventDefault()}
                    size="sm"
                >
                    See Answers
                </Button>
            </td>
            <td className="text-right">
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={(e) => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={toggleEditModal}
                        >
                            Edit
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={toggleModal}
                        >
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>


        </tr>


            <Modal id={"deleteModal"} isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Delete Question</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this Question?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggleModal}>Yes</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>No</Button>
                </ModalFooter>
            </Modal>



            <Modal id={"editModal"} isOpen={editModal} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit Question</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="questionInput">Question</Label>
                            <Input type="text" name="text" id="questionInput" placeholder="Value of Question Selected" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Answers</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Select</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelectMulti">Select Multiple</Label>
                            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <Button onClick={toggleEditModal}>Submit</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        </React.Fragment>
    )};

export default Question;