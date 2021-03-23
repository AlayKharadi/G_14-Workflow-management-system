import { useState, useEffect } from "react";
import { Grid, Button, FormControl, OutlinedInput, InputLabel, FormHelperText, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from "axios";

function LogIn(props) {
    //user value from the form
    const [user, setUsername] = useState("");
    //warning when the user tries to input worng user patterns
    const [userWarning, setUserWarning] = useState("");

    //pwd value from the form
    const [pwd, setPwd] = useState("");
    //warning when the user tries to input wrong password patterns
    const [pwdWarning, setPwdWarning] = useState("");

    //checks the user input on every change in form fields
    function handleChange(e) {
        //clear every warnings
        setUserWarning("");
        setPwdWarning("");

        //get the value attribute of the target that created event e
        const value = e.target.value;
        const pattern = /^[0-9a-zA-Z]*$/;

        //check for the username
        if (e.target.name === "username") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setUsername("");
                setUserWarning("Username is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setUserWarning("Username must be alphanumerical.");
                return false;
            }
            //set the username
            setUsername(e.target.value);
        }
        if (e.target.name === "password") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setPwd("");
                setPwdWarning("Password is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
            //set the password
            setPwd(e.target.value);
        }
        return true;
    }

    function loginuser() {
        //clear every warnings
        setUserWarning("");
        setPwdWarning("");

        //check if the user and pwd is empty or not
        if (user === "" || pwd === "") {
            if (user === "") {
                setUserWarning("username is required.");
            }
            if (pwd === "") {
                setPwdWarning("password is required.");
            }
            return;
        }

        //size constraint for the user and pwd
        if ((user.length < 8 || user.length > 30) && (pwd.length < 10 || pwd.length > 30)) {
            setUserWarning("Username must be 8 to 30 letters long.");
            setPwdWarning("Password must be 10 to 30 letters long.");
            return false;
        }

        if (user.length < 8 || user.length > 30) {
            setUserWarning("Username must be 8 to 30 letters long.");
            return false;
        }

        if (pwd.length < 10 || pwd.length > 30) {
            setPwdWarning("Password must be least 10 to 30 letters long.");
            return false;
        }

        const pattern = /^[0-9a-zA-Z]*$/;

        //check whether values matches the pattern or not
        if (!pattern.test(user) || !pattern.test(pwd)) {
            if (!pattern.test(user) && !pattern.test(pwd)) {
                setUserWarning("Username must be alphanumerical.");
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
            if (!pattern.test(user)) {
                setUserWarning("Username must be alphanumerical.");
                return false;
            }

            if (!pattern.test(pwd)) {
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
        }                           

        fetch("")
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            .then(
                () => {
                    console.log("something went wrong!!!");
            });
        // const username = [user, pwd];
        // window.localStorage.setItem("user", username);
        // props.handlelogin(true);
    }

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("user");
        if (loggedInUser) {
            //const foundUser = JSON.parse(loggedInUser);
            props.handlelogin(true);
        }
    }, [props]);

    const [showPassword, setshowPassword] = useState(false);

    return (
        <form noValidate autoComplete="off" name="login-form">
            <Grid color="secondary">
                <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="username" variant="outlined" error={userWarning !== ""}>Username</InputLabel>
                        <OutlinedInput
                            id="username"
                            type="text"
                            name="username"
                            label="Username"
                            error={userWarning !== ""}
                            aria-describedby="my-helper-text-user"
                            value={user}
                            onChange={handleChange}
                        />
                        <FormHelperText id="my-helper-text-user" error={userWarning !== ""}>{userWarning}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="password" variant="outlined" error={pwdWarning !== ""}>Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={ showPassword ? "text" : "password"}
                            name="password"
                            label="Password"
                            error={pwdWarning !== ""}
                            aria-describedby="my-helper-text-pwd"
                            value={pwd}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setshowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="my-helper-text-pwd" error={pwdWarning !== ""}>{pwdWarning}</FormHelperText>
                    </FormControl>
                </Grid>
                
                <Grid container item direction="column" justify="center" alignItems="center" xs={12} >
                    <Button variant="contained" color="primary" onClick={loginuser}>
                        Log-In
                    </Button>
                </Grid>
            </Grid>
        </form >
    );
}

export default LogIn;