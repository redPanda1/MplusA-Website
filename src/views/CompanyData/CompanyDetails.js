import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, TextField, IconButton, Divider } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch'


const useStyles = makeStyles((theme) => ({
    divider: {marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    dataField: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(2)
        }
    }
}));



const CompanyDetails = ({ companyData }) => {
    const classes = useStyles()
    // const theme = useTheme(); 
    // const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    //     defaultMatches: true,
    //   });


    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} className={classes.divider}>
                    <Divider />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Company Name
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        value={companyData.name}
                        placeholder="company name"
                        variant="outlined"
                        size="medium"
                        name="companyName"
                        fullWidth
                        type="text"
                        className={classes.dataField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Website
                    </Typography>
                    <Grid container>
                        <Grid item xs={11} md={11}>
                            <TextField
                                inputProps={{
                                    readOnly: Boolean(true),
                                    disabled: Boolean(true),
                                }}
                                value={companyData.details.website}
                                placeholder="website"
                                variant="outlined"
                                size="medium"
                                name="website"
                                type="url"
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <IconButton color="primary" onClick={() => {
                                window.open(companyData.details.website, '_blank');
                            }}>
                                <LaunchIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Contact
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        value={`${companyData.details.givenName} ${companyData.details.familyName}`}
                        placeholder="contact Name"
                        variant="outlined"
                        size="medium"
                        name="contactName"
                        fullWidth
                        className={classes.dataField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        Email
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        value={companyData.details.contactEmail}
                        placeholder="email"
                        variant="outlined"
                        size="medium"
                        name="email"
                        fullWidth
                        type="email"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.inputTitle}
                    >
                        M+A Contact
                    </Typography>
                    <TextField
                        inputProps={{
                            readOnly: Boolean(true),
                            disabled: Boolean(true),
                        }}
                        value={companyData.application.maContact}
                        placeholder="m+a contact Name"
                        variant="outlined"
                        size="medium"
                        name="contactName"
                        fullWidth
                        className={classes.dataField}
                    />
                </Grid>

            </Grid>



        </React.Fragment>

    )
}

export default CompanyDetails


