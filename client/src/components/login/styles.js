const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: '#fff'
        }
    },
    paper: {
        marginTop: '50%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    linkContainer:{
        marginTop:"3%",
    },
    link: {
        color: "#000000",
        textDecoration: "none"
    },
    signUp: {
        color: "#29487d",
        textTransform: "upperCase",
        textDecoration: "underline #29487d"
    },
    submit:{
        color:'#fff',
        backgroundColor:'#00C170'
    }
});

export default styles;
