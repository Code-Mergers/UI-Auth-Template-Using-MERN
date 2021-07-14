import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";


class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            error:"",
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
                            Forgot Password
                        </Typography>
                        <Typography component="h6" variant="caption" className={classes.title}>
                            Please enter the registered email address. <br/>
                            We will send you reset password confirmation to this email if user exists.
                        </Typography>
                        <form onSubmit={e => this.submitRequest(e)}>
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
                                onChange={e => this.handleChange(e)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Forgot Password
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    submitRequest = async (e) => {
        e.preventDefault();
        const {email} = this.state;

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const {data} = await axios.post("http://localhost:5000/api/auth/forgotpassword", {email}, config);
            this.setState({
                success:data.data
            })
        }catch (error){
            this.setState({
                error:error
            })
            setTimeout(()=>{
                this.setState({ signupError: " " });
            },5000);
        }
    };
}

export default withStyles(styles)(ForgotPassword);
