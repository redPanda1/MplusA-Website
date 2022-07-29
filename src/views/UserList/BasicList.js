import React from 'react';
import { useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';
import ResetIcon from '@material-ui/icons/RefreshOutlined'
import moment from 'moment'

const BasicList = ({ userData = [], showDialog, closeDialog, resetUserPassword, lockUser }) => {
    const history = useHistory();
    const selectRow = (id) => {
        history.push(`/person/${id}`)
    }

    const resetPassword = (e, user) => {
        e.stopPropagation()
        resetUserPassword(user.email)
    }

    const lockUnlockUser = (e, user) => {
        e.stopPropagation()
        lockUser(user.id)
    }

    return (
        <React.Fragment>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Last Login</TableCell>
                        <TableCell>Reset Password</TableCell>
                        <TableCell>Lock User</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.map((item) => (
                        <TableRow hover key={item.id} onClick={() => { selectRow(item.id) }} >
                            <TableCell>
                                <Avatar alt={item.name} src={item.photoURL} />
                            </TableCell>
                            <TableCell>{item.personName}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.status && item.status[0].toUpperCase() + item.status.slice(1)}</TableCell>
                            <TableCell>{item.lastLogin ? moment.utc(item.lastLogin).local().format("MMM Do, YYYY - h:mm a") : ""}</TableCell>

                            <TableCell>
                                <IconButton color="inherit" onClick={(e) => resetPassword(e, item)} size="large">
                                    <ResetIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    color={item.active ? "primary" : "secondary"}
                                    onClick={(e) => lockUnlockUser(e, item)}
                                    size="large">
                                    {item.active ? (<LockOpenIcon />) : (<LockIcon />)} 
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            {/* <NewUserModal open={showDialog} onClose={closeDialog}/> */}
        </React.Fragment>
    );
}

export {BasicList as default}