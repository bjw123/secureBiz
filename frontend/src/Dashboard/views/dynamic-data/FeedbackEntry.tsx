import React from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown} from "reactstrap";

const FeedbackEntry = (props:any) => {
    //add data as param or props:data

    //Generic Data Response from backend
    const response = {
        name: 'David Smith',
        phone: '0432123222',
        email: 'user@exampe.com',
        content: 'I would like to give a good feedback',
        createdAt: '2021-01-31T03:33:31.579+00:00'
    };
    //<td>{data.name}</td>

    return(<React.Fragment>
        <tr>
            <th scope="row">
                <Media className="align-items-center">
                    <a
                        className="avatar rounded-circle mr-3"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img
                            alt="..."
                            src={
                                require("../../assets/img/icons/common/feedback.jpg")/*"../assets/img/icons/common/feedback.jpg"*/
                                    .default
                            }
                        />
                    </a>
                    <Media>
                          <span className="mb-0 text-sm">
                              {props.data.name}
                          </span>
                    </Media>
                </Media>
            </th>
            <td>{props.data.email}</td>
            <td>
                {props.data.phone}
            </td>
            <td>
                <div className="last-login">
                    {props.data.createdAt}
                </div>
            </td>
            <td>
                <div className="d-flex align-items-center">
                    <span className="mr-2">{props.data.content}</span>
                </div>
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
                            onClick={(e) => e.preventDefault()}
                        >
                            Delete
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    </React.Fragment>)
}

export default FeedbackEntry;