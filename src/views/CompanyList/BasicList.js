import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'

const headerCells = [
    { id: 'name', label: 'Company Name' },
    { id: 'contact', label: 'Contact' },
    { id: 'sector', label: 'Sector' },
    { id: 'model', label: 'Business Model' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'status', label: 'Status' },
  ]
  
const useStyles = makeStyles((theme) => ({
    textOK: { color: "green" },
    textError: { color: "red" },
    visuallyHidden: { border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden',
                    padding: 0, position: 'absolute', top: 20, width: 1,},
}))

const TableHeader = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(property)
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell/>
          {headerCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
}

const BasicList = ({ companyList = [], sortData }) => {

    console.log(companyList)

    const classes = useStyles()
    const history = useHistory();
    const [isAsc, setIsAsc] = useState(false)
    const [orderBy, setOrderBy] = useState()
    const selectRow = (id, idx) => {
        console.log(companyList[idx])
        history.push({pathname: `admin/company/${id}`, state: {companyData: companyList[idx]}})
    }

    const handleRequestSort = (property) => {
        const newOrderAsc = orderBy === property && !isAsc
        setIsAsc(newOrderAsc)
        setOrderBy(property)
        sortData({orderBy:property, isAsc:newOrderAsc})
    }

    return (
        <React.Fragment>
            <Table size="medium">
                <TableHeader
                    classes={classes}
                    order={isAsc ? "asc" : "desc"}
                    orderBy={orderBy}                    
                    onRequestSort={handleRequestSort} />
                <TableBody>
                    {companyList.map((item, idx) => (
                        <TableRow hover key={item.id} onClick={() => { selectRow(item.id, idx) }} >
                            <TableCell>
                                {item.details.logoUrl ? (<Avatar src={item.details.logoUrl} alt={item.name} variant="rounded" />)
                                    : (<Avatar variant="rounded">
                                        <ImageIcon />
                                    </Avatar>)}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.details.givenName} {item.details.familyName}</TableCell>
                            <TableCell>{item.details.sector}</TableCell>
                            <TableCell>{item.details.model}</TableCell>
                            <TableCell>{item.reviews.length}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default BasicList