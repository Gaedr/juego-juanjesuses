import React, { useState } from 'react';
import {
  Panel, InputNumber, Form, FormGroup, ControlLabel, FormControl
}  from 'rsuite';

export const InputDataPlayer = (props) => {
  const [playerData, setPlayerData] = useState({simples: 0, entrenadas: 0, caballeros:0, strategy: 0});

  const changeData = (value) => {
    setPlayerData(value);
    props.onChangeData(value)
  }

  return (
    <Panel padding={16} bordered>
      <Form formValue={playerData} onChange={(value) => changeData(value)}>
        <FormGroup>
          <ControlLabel>Jugador</ControlLabel>
          <FormControl name="name"/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Estrategia</ControlLabel>
          <FormControl name="strategy" accepter={InputNumber}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Simples</ControlLabel>
          <FormControl name="simples" accepter={InputNumber}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Entrenadas</ControlLabel>
          <FormControl name="entrenadas"  accepter={InputNumber}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Caballeros</ControlLabel>
          <FormControl name="caballeros" accepter={InputNumber}/>
        </FormGroup>
      </Form>
    </Panel>
  );
};
