import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';
import 'react-toastify/dist/ReactToastify.min.css';

import Main from '../hoc/Main';
import { signUp } from '../actions';
import history from '../helpers/history';

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
      margin: theme.spacing(),
      backgroundColor: theme.palette.secondary.main,
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
    name: { message: 'name', required: true, email: false, password: false },
    email: { message: 'email', required: true, email: true, password: false },
    password: { message: 'password', required: true, email: false, password: true },
    confirmPassword: { message: 'confirm password', required: true, email: false, password: false }
}

class Register extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
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
        const { name, email, password, confirmPassword } = this.state;
        const errorMessages = this.validateFields();
        if(errorMessages.length <= 0) {
            this.props.signUp({ name, email, password, confirmPassword });
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

    handleCancel = () => {
        history.push('/login');
    }

    validateFields() {
        const { password, confirmPassword } = this.state;
        const errorMessages = [];
        for (let key in fields) {
            if(fields[key].required && validator.isEmpty(this.state[key])) {
                errorMessages.push(`The ${fields[key].message} is required`);
            }
            if(fields[key].email && !validator.isEmail(this.state[key])) {
                errorMessages.push(`The ${fields[key].message} is not an email`);
            }
            if(fields[key].password && !validator.matches(this.state[key], 
                "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")) {
                errorMessages.push(`The ${fields[key].message} is very weak`);
            }
        }
        if(password !== confirmPassword) {
            errorMessages.push(`The passwords fields are different`);
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
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Name</InputLabel>
                                <Input
                                    required
                                    id="name" 
                                    name="name" 
                                    autoComplete="name" 
                                    autoFocus
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    required
                                    id="email" 
                                    name="email" 
                                    autoComplete="email"
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
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                                <Input
                                    required 
                                    name="confirmPassword" 
                                    type="password" 
                                    id="confirmPassword" 
                                    autoComplete="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    disabled={loading}
                                />
                            </FormControl>
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
                                    Sign up
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                            <div className={classes.wrapper}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={this.handleCancel}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
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

const mapDispatchToProps = { signUp };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));