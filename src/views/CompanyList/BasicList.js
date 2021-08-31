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
    const classes = useStyles()
    const history = useHistory();
    const [isAsc, setIsAsc] = useState(false)
    const [orderBy, setOrderBy] = useState()

    const selectRow = (id, idx) => {
        console.log(companyList[idx])
        history.push({pathname: `/admin/company/${id}`})
    }

    const handleRequestSort = (property) => {
        const newOrderAsc = orderBy === property && !isAsc
        setIsAsc(newOrderAsc)
        setOrderBy(property)
        sortData({orderBy:property, isAsc:newOrderAsc})
    }

    const getContactName = (item) => {
      let contactName = "missing"
      if (item.details && item.details.contact) {
        if (item.details.contact.givenName) {
          contactName = item.details.contact.givenName
        }
        if (item.details.contact.familyName) {
          contactName += " "
          contactName += item.details.contact.familyName
        }
      }
      return contactName.trim()
    }

    // Needed as Reviews can be a number or an array
    const getNumReviews = (item) => {
      if (typeof item.reviews === 'number') {
        return item.reviews
      } else if (typeof item.reviews === 'object') {
        return item.reviews.length
      } else {
        return 0
      }
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
                        <TableRow hover key={idx} onClick={() => { selectRow(item.id, idx) }} >
                            <TableCell>
                                {(item.details && item.details.logoUrl) ? (<Avatar src={item.details.logoUrl} alt={item.name} variant="rounded" />)
                                    : (<Avatar variant="rounded">
                                        <ImageIcon />
                                    </Avatar>)}
                            </TableCell>
                            <TableCell>{item.details && item.details.name}</TableCell>
                            <TableCell>{getContactName(item)}</TableCell>
                            <TableCell>{item.details && item.details.sector}</TableCell>
                            <TableCell>{item.details && item.details.model}</TableCell>
                            <TableCell>{getNumReviews(item)}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default BasicList