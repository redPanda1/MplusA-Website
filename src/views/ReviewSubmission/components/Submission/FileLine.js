import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
    inputTitle: {
        fontWeight: 700,
        // marginBottom: theme.spacing(1),
    },
}))



const FlieLine = ({ fileUrl = "" }) => {
    const classes = useStyles();
    let fileName = fileUrl.split('/').pop()

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={11} md={11}>
                        <TextField
                            inputProps={{
                                readOnly: Boolean(true),
                                disabled: Boolean(true),
                            }}
                            value={fileName}
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
            </Grid>
        </React.Fragment>
    );
}

export default FlieLine





