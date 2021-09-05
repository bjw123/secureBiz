import {Progress} from "reactstrap";
import React from "react";

const DashboardTable = (props:any) => {
    console.log("props " , props)
    return(<React.Fragment>
        <tr>
            <th scope='row'>{props.data[0]}</th>
            <td>
                <div className='d-flex align-items-center'>
                    <span className='mr-2'>{props.data[1]} assessments</span>

                </div>
            </td>
        </tr>
    </React.Fragment>
    )}
    export default DashboardTable;


/*
   <div>
                        <Progress
                            max='100'
                            value='100'
                            barClassName='bg-danger'
                        />
                    </div>
 */