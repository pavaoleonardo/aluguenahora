// React
import React, { useState, useEffect, useRef } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import CustomButton from '../custom-button/CustomButton';
// import { advertActive } from '../../actions/adverts';

//Styles
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
  buttons: {
    marginTop: '4rem',
    marginLeft: '1rem',
    justifyContent: 'space-evenly',
  },
}));

const types = [
  {
    value: '1',
    label: 'Casa',
  },
  {
    value: '2',
    label: 'Apartamento',
  },
  {
    value: '3',
    label: 'Studio e Kitnet',
  },
];

export function EditCardAdvert() {
  const classes = useStyles();

  const { active: advert } = useSelector((state) => state.adverts);
  console.log(advert);

  // const dispatch = useDispatch();

  const initialValues = {
    types: { value: '' },
    rua: '',
    bairro: '',
    valor: '',
  };

  const [values, setValues] = useState(initialValues);

  function handleFormSubmit() {
    console.log(values);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const activeId = useRef(advert.id);

  useEffect(() => {
    const reset = (newFormValues = initialValues) => {
      setValues(newFormValues);
    };
    if (advert.id !== activeId.current) {
      reset(advert);
      activeId.current = advert.id;
    }
  }, [advert, initialValues]);

  // useEffect(() => {
  //   dispatch(advertActive(initialValues.id, { ...initialValues }));
  // }, [initialValues, dispatch]);

  return (
    <>
      <form classes={classes.root} onSubmit={handleFormSubmit}>
        <Grid
          container
          justify='center'
          direction='row'
          alignItems='center'
          style={{ height: '25em' }}
        >
          <Grid item style={{ marginTop: '1em' }}>
            <Typography variant='h2'>Editar seu imóvel</Typography>
            <Typography variant='h3'>Preencha os dados necessários</Typography>

            <TextField
              defaultValue={'2'}
              fullWidth
              select
              helperText='Selecione tipo de imóvel '
              variant='outlined'
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              name='rua'
              value={values.rua}
              type='text'
              autoComplete='on'
              label='Rua'
              variant='outlined'
              required
              helperText='introduza o endereço'
              style={{ marginTop: '2em' }}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              name='bairro'
              value={values.bairro}
              type='text'
              autoComplete='on'
              label='Bairro'
              variant='outlined'
              helperText='Introduza o nome do bairro'
              required
              style={{ marginTop: '2em' }}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              name='valor'
              value={values.valor}
              type='text'
              autoComplete='on'
              label='R$'
              variant='outlined'
              required
              helperText='Introduza o valor do aluguel'
              onChange={handleInputChange}
              style={{ marginTop: '1em' }}
            />
            <Grid container justify='space-between'></Grid>
          </Grid>
        </Grid>
      </form>
      <Grid
        container
        justify='center'
        direction='row'
        className={classes.buttons}
      >
        <CustomButton variant='contained' type='submit' color='default'>
          Editar
        </CustomButton>
        <CustomButton variant='contained' type='submit' color='secondary'>
          Deletar
        </CustomButton>
      </Grid>
    </>
  );
}
