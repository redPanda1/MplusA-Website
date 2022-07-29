import React from 'react'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import GetAppIcon from '@material-ui/icons/GetApp'
import IconButton from '@mui/material/IconButton'

const useStyles = makeStyles((theme) => ({
    fileLine: {
        marginBottom: theme.spacing(1),
    },
}));


const Flies= ({ files = [] }) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Grid container>
            {files.map((fileUrl, idx) => (        
                            <Grid item key={idx} xs={12}>
                            <Grid container className={classes.fileLine}>
                                <Grid item xs={11} md={11}>
                                    <TextField
                                        inputProps={{
                                            readOnly: Boolean(true),
                                            disabled: Boolean(true),
                                        }}
                                        value={fileUrl.split('/').pop()}
                                        placeholder="file"
                                        variant="outlined"
                                        size="medium"
                                        name="deck/video/other"
                                        type="text"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={1} xs={1}>
                                    <IconButton color="primary" component={Link} href={fileUrl} size="large">
                                        <GetAppIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>)
            )}
            </Grid>
            
        </React.Fragment>
    );
}

export default Flies





