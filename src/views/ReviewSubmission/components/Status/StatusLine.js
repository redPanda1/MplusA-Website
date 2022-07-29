import React from 'react'
import moment from 'moment'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const getStatus = (status, isSm) => {
    const statusID = status.substring(0,1)
    switch (statusID) {
        case "1":
            return isSm ? "Submitted" : "Sub" 
        case "2":
            return isSm ? "Reviewed" :"Rev"
        case "4":
            return isSm ? "Scheduling Call" :"Call"
        case "9":
            return isSm ? "Rejected" :"Rej"
        default:
            return isSm ? "Other" :"XXX"
    }
}

const StatusLine = ({ status, isSm }) => {

    return (isSm ? (
        <TableRow>
            <TableCell>{getStatus(status.status, isSm)}</TableCell>
            <TableCell>{moment.utc(status.timestamp).local().format("MMM Do, YYYY - h:mm a")}</TableCell>
            <TableCell>{status.person}</TableCell>
            <TableCell>{status.comment}</TableCell>
        </TableRow>
    ) : (
        <TableRow>
            <TableCell>{getStatus(status.status, isSm)}</TableCell>
            <TableCell>{moment.utc(status.timestamp).local().format("M/D/YY")}</TableCell>
            <TableCell>{status.person}</TableCell>
        </TableRow>

    ))
}

export default StatusLine