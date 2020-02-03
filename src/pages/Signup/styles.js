import {makeStyles} from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

const styles = makeStyles( theme => ({
    alignContent: {
        marginTop: '10%',
        marginBottom: '10%'
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
    field: {
        width: '100%',
        marginTop: '2%',
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
    buttonRedirect: {
        padding: theme.spacing(1),
        width: '100%',
        marginTop: '5%',
        color: '#000000',
        borderRadius: 6,
    },
    alert: {
        width: '100%'
    },
    label: {
        marginTop: '2%',
        textAlign: 'center',
    }
}));

export default styles;