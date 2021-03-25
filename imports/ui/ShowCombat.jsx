
import React, { useState, useEffect } from 'react';

import { FlexboxGrid, InputNumber, Button, Panel, Divider, Container } from 'rsuite';
import { ShowDataPlayer } from './ShowDataPlayer';
import { TablaDatos} from './TablaDatos'

export const ShowCombat = (props) => {
    const [players, setPlayers] = useState({
        player1: {roll: 0, modifier: 1},
        player2: {roll: 0, modifier: 1},
    });

    const setTirada = (player, value) => {
        setPlayers({
            ...players,
            ...{
                [player]: { 
                    roll: Number(value),
                    modifier: players[player].modifier,
                }
            }
        });
    }

    const setModificador = (player, value) => {
        setPlayers({
            ...players,
            ...{
                [player]: { 
                    roll: players[player].roll,
                    modifier: Number(value)
                }
            }
        });
    }

    const nextTurn = () => {
        const {player1, player2} = players;

        props.onNextTurn({
            player1,
            player2
        });
    }

    return(
        <Container>
            <Panel header={`Turno ${props.turn}`}>
                <FlexboxGrid justify="space-around">
                    <FlexboxGrid.Item colspan={6}>
                        <ShowDataPlayer player={props?.combat?.player1}></ShowDataPlayer>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6}>
                        <ShowDataPlayer player={props?.combat?.player2}></ShowDataPlayer>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Divider>Datos Turno</Divider>
                <FlexboxGrid justify="space-between" >
                    <FlexboxGrid.Item colspan={6} align="middle">
                        <InputNumber prefix={`Tirada ${props?.combat?.player1?.name}`} name="tirada1" value={players.player1.roll} onChange={t => setTirada('player1', t)}></InputNumber>
                        <InputNumber prefix={`Modificador ${props?.combat?.player1?.name}`} name="modificador1" value={players.player1.modifier} onChange={t => setModificador('player1', t)}></InputNumber>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <Button onClick={() => nextTurn()}>Siguiente Turno</Button>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6} align="middle">
                        <InputNumber prefix={`Tirada  ${props?.combat?.player2?.name}`} name="tirada2" value={players.player2.roll} onChange={t => setTirada('player2', t)}></InputNumber>
                        <InputNumber prefix={`Modificador ${props?.combat?.player2?.name}`} name="modificador2" value={players.player2.modifier} onChange={t => setModificador('player2', t)}></InputNumber>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Divider></Divider>
                <FlexboxGrid justify="center">
                    {props.children}
                </FlexboxGrid>
                <Divider></Divider>

            </Panel>
        </Container>
    )
}