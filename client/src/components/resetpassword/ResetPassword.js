import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";


class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            password: null,
            cnfPassword: null,
            error: "",
            success: ""
        };
    }


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <form onSubmit={e => this.submitNewPass(e)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Enter New Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                autoFocus
                                onChange={e => this.userTyping("password", e)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="cnfpassword"
                                label="Confirm New Password"
                                type="password"
                                id="cnfpassword"
                                autoComplete="off"
                                autoFocus
                                onChange={e => this.userTyping("cnfPassword", e)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Reset Password
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }

    formIsValid = () => this.state.password === this.state.cnfPassword;

    userTyping = (type, e) => {
        switch (type) {
            case "password":
                this.setState({ password: e.target.value });
                break;
            case "cnfPassword":
                this.setState({ cnfPassword: e.target.value });
                break;
            default:
                break;
        }
    };



    submitNewPass = async (e) => {
        e.preventDefault();

        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }

        if (!this.formIsValid()) {
            this.setState({ password: "" });
            this.setState({ cnfPassword: "" });
            this.setState({ signupError: "Passwords do not match!" });

            setTimeout(()=>{
                this.setState({ signupError: " " });
            },5000);
            return;
        }

        const {password} = this.state;

        try {
            const {data} = await axios.put(`http://localhost:5000/api/auth/resetpassword/${this.props.match.params.resetToken}`, {password}, config);
            this.setState({
                success:data.data
            })
        }catch (error){
            this.setState({
                error:error
            })
            setTimeout(()=>{
                this.setState({ error: " " });
            },5000);
        }
    };
}

export default withStyles(styles)(ResetPassword);
