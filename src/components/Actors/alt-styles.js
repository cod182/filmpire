import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    containerLeft: {
        display: 'flex',
        justifyContent: 'left',
        margin: '10px 0 !important',
        [theme.breakpoints.down('md')]: {
            flexDirect: 'column',
            flexWrap: 'wrap',
        }
    },
    containerRight: {
        display: 'flex',
        justifyContent: 'right',
        marginTop: '10rem !important',
        [theme.breakpoints.down('md')]: {
            marginTop: '2rem !important',
        },
    },
    poster: {
        borderRadius: '20px',
        boxShadow: '16px 18px 32px 0px grey',
        width: '80%',
        [theme.breakpoints.down('md')]: {
            margin: '0 auto',
            width: '50%',
            height: '350px',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            width: '100%',
            height: '350px',
            marginBottom: '30px'
        },

    },
    actorName: {

    },
    bioShort: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
    },
}));
