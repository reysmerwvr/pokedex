import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';
import 'react-toastify/dist/ReactToastify.min.css';

import Main from '../hoc/Main';
import { signIn } from '../actions';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
      margin: theme.spacing()
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
    root: {
        display: 'flex',
        alignItems: 'center',
      },
      wrapper: {
        margin: theme.spacing(),
        position: 'relative',
      },
      buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
      fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
      buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
});

const fields = {
    email: { message: 'email', required: true, email: true, password: false },
    password: { message: 'password', required: true, email: false, password: true }
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { error } = nextProps;
        if (error !== prevState.error) {
            return { error };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        const { error } = prevProps;
        const errorMessage = this.props.error;
        if(error !== errorMessage) {
          toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const errorMessages = this.validateFields();
        if(errorMessages.length <= 0) {
            this.props.signIn({ email, password });
        } else {
            toast.warn(errorMessages.join('\n'), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    validateFields() {
        const errorMessages = [];
        for (let key in fields) {
            if(fields[key].required && validator.isEmpty(this.state[key])) {
                errorMessages.push(`The ${fields[key].message} is required`);
            }
            if(fields[key].email && !validator.isEmail(this.state[key])) {
                errorMessages.push(`The ${fields[key].message} is not an email`);
            }
        }
        return errorMessages;
    }

    render() {
        const { classes, loading } = this.props;
        return (
            <Main>
                <main className={classes.main}>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar 
                            className={classes.avatar}
                            alt={'Pokemon Image'}
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                        />
                        <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    required
                                    id="email" 
                                    name="email" 
                                    autoComplete="email" 
                                    autoFocus
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    required 
                                    name="password" 
                                    type="password" 
                                    id="password" 
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <div className={classes.wrapper}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.handleSubmit}
                                    disabled={loading}
                                >
                                    Sign in
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                            <div className={classes.wrapper}>
                                Don't you have account?  <Link to="/register/">Sign Up</Link>
                            </div>
                        </form>
                    </Paper>
                </main>
            </Main>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { error, loading } = auth;

    return { error, loading };
};

const mapDispatchToProps = { signIn };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));