import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    contentForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignConten: 'center',
    },
    contentAvatar: {
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },
    contentIcons: {
        margin: 5,
        width: '100%',
        paddingLeft: '95%'
    },
    avatar: {
        width: 256,
        height: 256,
        marginTop: '5%',
        borderRadius: 125
    },
    field: {
        width: '100%',
        marginTop: 10,
    },
    btn: {
        borderRadius: 6,
        marginTop: 15,
        backgroundColor: green['700'],
        size: 12,
        width: '100%',
        height: 50,
        color: '#ffffff',
        '&:hover': {
            backgroundColor: green['900']
        }
    },
    inputFile: {
        display: 'none'
    },
    buttonFile: {
        marginTop: '2%',
        borderRadius: 6
    }
}));

export default useStyles;