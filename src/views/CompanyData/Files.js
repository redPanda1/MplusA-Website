import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import GetAppIcon from '@material-ui/icons/GetApp'
import IconButton from '@material-ui/core/IconButton'

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
                                    <IconButton color="primary" component={Link} href={fileUrl}>
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





