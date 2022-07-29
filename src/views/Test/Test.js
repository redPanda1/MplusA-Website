import React from 'react';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,  
    AppointmentTooltip,
    Resources
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2021-07-21';
const schedulerData = [
    { startDate: '2021-07-22T11:00', endDate: '2021-07-22T12:00', title: 'M+A Meeting', members: [1,2,3,4,5] },
    { startDate: '2021-07-22T13:30', endDate: '2021-07-22T14:15', title: 'Edenesque Pitch', members: [2,4,5] },
    { startDate: '2021-07-23T09:00', endDate: '2021-07-23T11:30', title: 'Office Hours', members: [5,4,3,2,1] },
];

const resources = [
    {
      fieldName: 'members',
      title: 'Members',
      allowMultiple: true,
      instances: [
        { id: 1, text: 'Simon' },
        { id: 2, text: 'Graciela' },
        { id: 3, text: 'Bruce K' },
        { id: 4, text: 'Bruce H' },
        { id: 5, text: 'Cindy' },
      ],
    }]

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));


const Placeholder = () => {
    const classes = useStyles()


    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>

                <Scheduler
                    data={schedulerData}
                >
                    <ViewState
                        currentDate={currentDate}
                    />
                    <WeekView startDayHour={8} endDayHour={18} cellDuration={60}/>
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    <AppointmentTooltip />
                    <Resources
                    data={resources}
                  />
                </Scheduler>

            </Paper>
        </Container>
    )
}

export default Placeholder