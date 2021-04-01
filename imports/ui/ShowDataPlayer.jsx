import React, { useState } from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, InputNumber } from 'rsuite';

export const ShowDataPlayer = (props) => {


    return(
        <Panel header={props.player?.name} bordered>
            <Form formValue={props.player?.ejercito}>
                <FormGroup>
                    <ControlLabel>Simples</ControlLabel>
                    <FormControl disabled name="simples" accepter={InputNumber}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Entrenadas</ControlLabel>
                    <FormControl disabled name="entrenadas"  accepter={InputNumber}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Caballeros</ControlLabel>
                    <FormControl disabled name="caballeros" accepter={InputNumber}/>
                </FormGroup>
            </Form>
        </Panel>
    );
}