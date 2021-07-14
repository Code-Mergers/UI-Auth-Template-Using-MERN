import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            loginError: "",
        };
    }

    //once user is logged, it doesnt make sense to come on login/register screen
    componentDidMount() {
        if(localStorage.getItem("authToken")){
            this.props.history.push("/");
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <form onSubmit={e => this.submitLogin(e)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                onChange={e => this.userTyping("email", e)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={e => this.userTyping("password", e)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            {this.state.loginError ? (
                                <Typography
                                    className={classes.errorText}
                                    component="h5"
                                    variant="body2"
                                >
                                    The email address or password entered is incorrect
                                </Typography>
                            ) : null}
                            <Grid container justify="center">
                                <Grid className={classes.linkContainer}>
                                    <Link className={classes.link} variant="body2" to="/forgotpassword">
                                        Forgot Password?{" "}
                                        <span className={classes.signUp}>Forgot Password</span>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid className={classes.linkContainer}>
                                    <Link className={classes.link} variant="body2" to="/register">
                                        Don't have an account?{" "}
                                        <span className={classes.signUp}>Sign Up</span>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }

    userTyping = (type, e) => {
        switch (type) {
            case "email":
                this.setState({ email: e.target.value });
                break;
            case "password":
                this.setState({ password: e.target.value });
                break;
            default:
                break;
        }
    };

    submitLogin = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        try {
            const {data} = await axios.post("http://localhost:5000/api/auth/login", {email, password}, {
                header: {
                    "Content-Type": "application/json",
                },
            });
            localStorage.setItem("authToken", data.token);
            this.props.history.push("/");
        }catch (error){
            this.setState({
                error: error
            })
            setTimeout(()=>{
                this.setState({ error: " " });
            },5000);
        }
    };
}

export default withStyles(styles)(Login);
