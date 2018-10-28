import React from 'react';

const Input = ({ label }) => (
  label ? (
    <React.Fragment>
      <InputLabel htmlFor="password">Пароль</InputLabel>
      <Input
        name="password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
    </React.Fragment>
  )
  : (
    <Input
      name="password"
      type="password"
      id="password"
      autoComplete="current-password"
    />
  )
);