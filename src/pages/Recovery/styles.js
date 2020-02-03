import {makeStyles} from '@material-ui/core/styles';
import { orange, grey } from '@material-ui/core/colors';

const styles = makeStyles( theme => ({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',

        height: '100%',
    },
    alignContent: {
        marginTop: '10%',
        marginBottom: '10%'
    },
    card: {
        backgroundColor: orange['200'],
        borderRadius: 12,
        height: '75%',
        width: '100%', 
        alignItems: 'center',
        padding: '2%',
        textAlign: 'center'
    },
    label: {
        marginTop: '2%',
        marginLeft: '-2%',
        marginBottom: '5%',
        width: 800
        
    },
    labelColor: {
        color: grey['500']
    },
    image: {
        width: 128,
        height: 128,
    },
    fieldContent: {
        width: '100%'
    }, 
    field: {
        width: '65%'
    }, btn: {
        marginTop: '5%',
        fontSize: 12,
        padding: '2%',
        width: '25%',
        borderRadius: 12 
    }
}));

export default styles;