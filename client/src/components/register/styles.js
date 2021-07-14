const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: '#fff',
        }
    },
    paper: {
        marginTop: '40%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    submit: {
        marginTop: "20px",
        marginBottom: "30px",
        backgroundColor: "#00C170"
    },
    errorText: {
        color: "red",
        textAlign: "center",
    },
    link: {
        color: "#000000",
        textDecoration: "none"
    },
    signIn: {
        color: "#29487d",
        textTransform: "upperCase",
        textDecoration: "underline #29487d"
    },
});

export default styles;
