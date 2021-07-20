import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';

const FlieLine = ({ fileUrl = "" }) => {
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





