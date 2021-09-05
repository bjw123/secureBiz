import React from "react";
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    InputGroup,
    InputGroupAddon,
    Input,
    Button, Col,
} from "reactstrap";

const Report = (props:any) => {
    //add data as param or props:data

    //Generic Data Response from backend
    const response = {
        id: '1',
        category: 'appcontrol',
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
                                require("../../assets/img/icons/common/survey.jpg")
                                    .default
                            }
                        />
                    </a>
                    <Media>
                          <span className="mb-0 text-sm">
                              {props.data.category}
                          </span>
                    </Media>
                </Media>
            </th>
            <td>{props.data.createdAt}</td>

        </tr>
    </React.Fragment>)
}

export default Report;





/* ELEMENTS TO USE FOR NEXT ITERATION

<td>
                <Badge color="" className="badge-dot mr-4">
                    <i className="bg-success" />

                </Badge>
            </td>
            <td>
                Lvl ?
            </td>
            <td>
                <div className="d-flex align-items-center">
                    <span className="mr-2">100%</span>
                    <div>
                        <Progress
                            max="100"
                            value="100"
                            barClassName="bg-success"
                        />
                    </div>
                </div>
            </td>
            <td>?</td>
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
 */