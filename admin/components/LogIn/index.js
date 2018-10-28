import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

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
import { MdLock } from 'react-icons/md';

import css from './LogIn.scss';

const LogIn = props => {

  return (
    <React.Fragment>
      <CssBaseline />
      <main
        className={css.layout}
      >
        <Paper className={css.paper}>
          <Avatar className={css.avatar}>
            <MdLock />
          </Avatar>
          <Typography component="h1" variant="h5">
          {I18n.t('enter')}
          </Typography>
          <form className={css.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">{I18n.t('login')}</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={props.updateUserInfo}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">{I18n.t('password')}</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={props.updateUserInfo}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={I18n.t('rememberMe')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={css.submit}
            >
              Войти
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default LogIn;
