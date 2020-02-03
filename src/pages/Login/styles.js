import { makeStyles } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

const styles = makeStyles( theme => ({
    alignContent: {
        marginTop: '13%',
        marginBottom: '13%'
    },
    card: {
        backgroundColor: orange['200'],
        borderRadius: '6px',
        height: '75%',
        width: '100%', 
        alignItems: 'center',
        padding: '2%'
    },
    container: {
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        color: '#ffffff',
    },
    field: {
        marginTop: '5%',
        width: '100%'
    },
    buttonRedirect: {
        padding: theme.spacing(1),
        width: '100%',
        marginTop: '5%',
        borderRadius: 6,
        
    },
    button: {
        padding: theme.spacing(1),
        width: '100%',
        marginTop: '5%',
        color: 'white',
        borderRadius: 6,
        backgroundColor: green['700'],
        '&:hover': {
            backgroundColor: green['900']
        }
    },
    label: {
        marginTop: '2%',
        textAlign: 'center',
    },
    margin: {
        margin: theme.spacing(1)
    },
    recovery: {
        marginTop: '3%',
        marginLeft: '68%'
    },
    link: {
        textDecoration: 'none'
    },
    linkTypo: {
        color: '#333',
        transition: '0.2s',
        '&:hover': {
            color: '#FFF'
        }
    }
}));

export default styles;