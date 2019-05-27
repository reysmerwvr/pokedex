import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import Main from '../hoc/Main';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(),
        width: '100%'
    },
    card: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
});

class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.renderPokemonDetail = this.renderPokemonDetail.bind(this);
    }

    renderPokemonDetail() {
        const { classes, selectedPokemon } = this.props;
        return (_.size(selectedPokemon) > 0) ? (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={selectedPokemon.sprites.front_default}
                    title={'Pokemon Image'}
                    style={{ backgroundSize: 'contain' }}
                />
                <CardContent>
                    <TextField
                        id="id"
                        name="id"
                        label="Id"
                        value={selectedPokemon.id}
                        placeholder="Id"
                        margin="normal"
                        readOnly
                        inputProps={{ readOnly: true }}
                        fullWidth
                    />
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={selectedPokemon.name}
                        placeholder="Name"
                        margin="normal"
                        readOnly
                        inputProps={{ readOnly: true }}
                        fullWidth
                    /> 
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="types-simple">Type(s)</InputLabel>
                        <Select
                            value={0}
                            inputProps={{
                                name: 'types',
                                id: 'types-simple',
                            }}
                        >
                            {
                                selectedPokemon.types.map((value, index) => {
                                    return (
                                        <MenuItem 
                                            key={index}
                                            value={index}
                                        > 
                                            {value.type.name}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        id="height"
                        name="height"
                        label="Height"
                        value={selectedPokemon.height}
                        placeholder="Height"
                        margin="normal"
                        readOnly
                        inputProps={{ readOnly: true }}
                        fullWidth
                    />
                    <TextField
                        id="weight"
                        name="weight"
                        label="Weight"
                        value={selectedPokemon.weight}
                        placeholder="Weight"
                        margin="normal"
                        readOnly
                        inputProps={{ readOnly: true }}
                        fullWidth
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="moves-simple">Move(s)</InputLabel>
                        <Select
                            value={0}
                            inputProps={{
                                name: 'moves',
                                id: 'moves-simple',
                            }}
                        >
                            {
                                selectedPokemon.moves.map((value, index) => {
                                    return (
                                        <MenuItem 
                                            key={index}
                                            value={index}
                                        > 
                                            {value.move.name}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        ) : null;
    }

    render() {
        const { selectedPokemon } = this.props;
        return (
            <Main>
                <div className="row around-xs">
                    <Grid container spacing={3}>
                        <Grid 
                            item 
                            xs={12} 
                            md={6} 
                            lg={6}
                        >
                            {
                                selectedPokemon && 
                                this.renderPokemonDetail()
                            }
                        </Grid>
                    </Grid>
                </div>
            </Main>
        );
    }
}

const mapStateToProps = ({ pokemons }) => {
    const { selectedPokemon } = pokemons;

    return { selectedPokemon };
};

export default connect(mapStateToProps, {})(withStyles(styles)(Pokemon));
