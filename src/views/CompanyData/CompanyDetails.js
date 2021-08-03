import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, TextField, IconButton, Divider, Box, MenuItem, Input } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch'
import { CardBase } from 'components/organisms';
import { Image } from 'components/atoms';
import { MODEL_OPTIONS, SECTOR_OPTIONS } from 'common/constants';

const useStyles = makeStyles((theme) => ({
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    dataField: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(2)
        }
    },
    logo: {
        marginBottom: theme.spacing(2),
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: theme.spacing(1),
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: 200,
        height: 200,
    },
    logo2: {
        cursor: 'pointer',
    }


}));


const CompanyDetails = ({ companyDetails = {}, readOnly, updateDetails }) => {
    const classes = useStyles()
    const { name = "" } = companyDetails
    const { website = "" } = companyDetails
    const { sector = "" } = companyDetails
    const { model = "" } = companyDetails
    const { logoUrl = "" } = companyDetails
    const { maContact = "" } = companyDetails
    const { contact = {} } = companyDetails
    const { email = "" } = contact
    const { name: contactName } = contact
    const { givenName = "" } = contact
    const { familyName = "" } = contact
    const logoRef = useRef(null);

    console.log(logoUrl)

    const updateLogo = (e) => {
        console.log("Hi there")
        console.log(e.target.files.length)
        if (e.target.files.length > 0) {
            console.log(e.target.files[0])
            const newLogoURL = URL.createObjectURL(e.target.files[0])
            console.log(newLogoURL)
            console.log(typeof newLogoURL)
            console.log(newLogoURL.substring(0, 4))
            // setNewLogo(newLogoURL)
            updateDetails({ logoUrl: newLogoURL, logoFile: e.target.files[0]})
        }
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} className={classes.divider}>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={3} >
                    <Box className={classes.logo} onClick={() => logoRef.current && logoRef.current.click()}>
                        <Image src={logoUrl} className={readOnly ? "" : classes.logo2} />
                    </Box>
                    <input disabled={readOnly} ref={logoRef} accept="image/*" id="logo"
                        type="file" hidden onChange={updateLogo} />

                </Grid>

                <Grid item xs={12} sm={9}>
                    <Grid container direction="column">
                        <Grid item >
                            <Typography variant="subtitle1" className={classes.inputTitle}>
                                Company Name
                            </Typography>
                            <TextField
                                variant={readOnly ? "outlined" : "filled"}
                                inputProps={{ readOnly, disabled: readOnly }}
                                value={name}
                                onChange={(e) => { updateDetails({ name: e.target.value }) }}
                                placeholder="company name"
                                size="medium"
                                name="companyName"
                                fullWidth
                                type="text"
                            />
                        </Grid>
                        <Grid item >
                            <Typography variant="subtitle1" className={classes.inputTitle}>
                                Website
                            </Typography>
                            <Grid container>
                                <Grid item xs={11} md={11}>
                                    <TextField
                                        variant={readOnly ? "outlined" : "filled"}
                                        inputProps={{ readOnly, disabled: readOnly }}
                                        value={website}
                                        onChange={(e) => { updateDetails({ website: e.target.value }) }}
                                        placeholder="website"
                                        size="medium"
                                        name="website"
                                        type="url"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={1} xs={1}>
                                    <IconButton color="primary" onClick={() => {
                                        window.open(website, '_blank');
                                    }}>
                                        <LaunchIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" className={classes.inputTitle}>
                        Sector
                    </Typography>
                    <TextField
                        variant={readOnly ? "outlined" : "filled"}
                        select
                        inputProps={{ readOnly, disabled: readOnly }}
                        value={sector}
                        onChange={(e) => { updateDetails({ sector: e.target.value }) }}
                        placeholder="sector"
                        size="medium"
                        name="sector"
                        fullWidth
                        className={classes.dataField}
                    >
                        {SECTOR_OPTIONS.map((option, idx) => (
                            <MenuItem key={idx} value={option.title}>
                                {option.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" className={classes.inputTitle}>
                        Model
                    </Typography>
                    <TextField
                        variant={readOnly ? "outlined" : "filled"}
                        select
                        inputProps={{ readOnly, disabled: readOnly }}
                        value={model}
                        onChange={(e) => { updateDetails({ model: e.target.value }) }}
                        placeholder="model"
                        size="medium"
                        name="model"
                        fullWidth
                    >
                        {MODEL_OPTIONS.map((option, idx) => (
                            <MenuItem key={idx} value={option.title}>
                                {option.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>







                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" className={classes.inputTitle}>
                        Contact
                    </Typography>
                    <TextField
                        variant={readOnly ? "outlined" : "filled"}
                        inputProps={{ readOnly, disabled: readOnly }}
                        value={contactName ? contactName : `${givenName} ${familyName}`}
                        onChange={(e) => { updateDetails({ contact: { name: e.target.value } }) }}
                        placeholder="contact Name"
                        size="medium"
                        name="contactName"
                        fullWidth
                        className={classes.dataField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" className={classes.inputTitle}>
                        Email
                    </Typography>
                    <TextField
                        variant={readOnly ? "outlined" : "filled"}
                        inputProps={{ readOnly, disabled: readOnly }}
                        value={email}
                        onChange={(e) => { updateDetails({ contact: { email: e.target.value } }) }}
                        placeholder="email"
                        size="medium"
                        name="email"
                        fullWidth
                        type="email"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" className={classes.inputTitle}>
                        M+A Contact
                    </Typography>
                    <TextField
                        variant={readOnly ? "outlined" : "filled"}
                        inputProps={{ readOnly, disabled: readOnly }}
                        value={maContact}
                        onChange={(e) => { updateDetails({ maContact: e.target.value }) }}
                        placeholder="m+a contact Name"
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


