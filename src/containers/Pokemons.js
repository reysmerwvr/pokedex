import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Main from '../hoc/Main';
import history from '../helpers/history';
import { getPokemons, setFilteredPokemons, selectPokemon } from '../actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    icon: {
        margin: theme.spacing(),
    },
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        width: 200,
    },
    formControl: {
       display: 'flex',
       alignItems: 'flex-end',
       justifyContent: 'flex-end'
    },
    searchButton: {
        cursor: 'pointer',
    },
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
});

class Pokemons extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderPokemons = this.renderPokemons.bind(this);
        this.selectPokemon = this.selectPokemon.bind(this);
    
        this.state = {
            search: '',
            wait: null
        };
    }

    componentDidMount() {
        const { pokemonsList, getPokemons } = this.props;
        if(_.size(pokemonsList) <= 0) {
            getPokemons();
        }
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }

    handleSearch = event => {
        const self = this;
        const { pokemonsList } = this.props;
        const { search } = this.state;
        let { wait } = this.state;
        if (wait !== null) {
            clearTimeout(wait);
        }
        wait = setTimeout(() => {
            const searchWordsArray = search.trim()
                                            .split(' ')
                                            .filter(word => word.length > 0)
                                            .map(word => word.toLowerCase());
            const filteredPokemons = pokemonsList.filter(
                pokemon => {
                    const { name, types } = pokemon;
                    const type = types.map(value => {
                        return value.type.name;
                    }).join(' ');
                    const matchesArray = searchWordsArray.filter(
                        word => (name.toLowerCase().indexOf(word) >= 0 || type.toLowerCase().indexOf(word) >= 0)
                    );
                    return matchesArray.length > 0;
                }
            );
            self.props.setFilteredPokemons(filteredPokemons);
        }, 300);
        this.setState({ search, wait });
    }

    selectPokemon(pokemon) {
        this.props.selectPokemon(pokemon);
        history.push(`/pokemons/${pokemon.id}`);
    }

    renderPokemons(pokemonsList) {
        const { classes } = this.props;
        return (
            pokemonsList.length > 0 &&
            pokemonsList.map((pokemon, index) => {
                const { name, sprites, types } = pokemon;
                const type = types.map(value => {
                    return value.type.name;
                }).join(' - ');
                return (
                    <Grid 
                        item 
                        xs={12} 
                        md={6} 
                        lg={4}
                        key={index}
                    >
                        <Card
                            className={classes.card} 
                            onClick={() => this.selectPokemon(pokemon)}
                        >
                            <CardHeader
                                avatar= {
                                    <Avatar 
                                        className={classes.avatar}
                                        alt={'Pokemon Image'}
                                        src={sprites.front_default}
                                    >
                                    </Avatar>
                                }
                                title={`Name: ${name}`}
                                subheader={`Type(s): ${type}`}
                            />
                            <CardMedia
                                className={classes.media}
                                image={sprites.front_default}
                                title={'Pokemon Image'}
                                style={{ backgroundSize: 'contain' }}
                            />
                            <CardActions>
                                <Button 
                                    size="small" 
                                    color="primary"
                                    onClick={() => this.selectPokemon(pokemon)}
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })
        );
    }

    render() {
        const { classes, pokemonsList, pokemonsFilteredList } = this.props;
        return (
            <Main>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="search"
                        name="search"
                        label="Search"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange}
                        onBlur={this.handleSearch}
                        value={this.state.search}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <Search
                                    className={classes.searchButton} 
                                    onClick={this.handleSearch} 
                                />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <div 
                    className={classes.root}
                >
                    <Grid container spacing={3}>
                        {
                            pokemonsFilteredList.length > 0 ?
                                this.renderPokemons(pokemonsFilteredList)
                            :
                                this.renderPokemons(pokemonsList)
                        }
                    </Grid>
                </div>
            </Main>
        );
    }
}

const mapStateToProps = ({ pokemons }) => {
    const { error, loading, paginator, pokemonsList, pokemonsFilteredList } = pokemons;

    return { error, loading, paginator, pokemonsList, pokemonsFilteredList };
};

export default connect(mapStateToProps, 
    { 
        getPokemons,
        setFilteredPokemons,
        selectPokemon
    }
)(withStyles(styles)(Pokemons));