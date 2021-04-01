
import React, { useState } from 'react';
import { Panel, Button } from 'rsuite';
import { BattleInData } from './BattleInData';
import { ShowCombat } from './ShowCombat';
import { TablaDatos } from './TablaDatos';

export const Combat = (props) => {
  const [turn, setTurn] = useState(0);
  const [combats, setCombats] = useState([]);


  const startBattle = (data) => {
    const {player1, player2} = data;
    setCombats([
      {
        player1,
        player2,
        turn,
        createdAt: new Date()
      }
    ])
    setTurn(turn + 1);
  };

  const calculateKills = (player) => {
    const {strategy, modifier, roll, ejercito} = player;
    const armyDamage = ejercito.simples + (1.5 * ejercito.entrenadas * 1.5) + (ejercito.caballeros * 2);
    return (strategy + 0.5) * modifier * armyDamage / (2 * roll);
  }

  const killByWave = (army, total, kills) => {
    const percentage = (army * 100)/total;
    return Math.round( (percentage / 100) * kills);
  }

  const doRaid = (defender, attacker) => {
    const { simples = 0, entrenadas = 0, caballeros = 0 } = defender?.ejercito;
    const kills = calculateKills(attacker);
    const total = simples + entrenadas + caballeros;

    const bajas = {
      simples: killByWave(simples, total, kills),
      entrenadas: killByWave(entrenadas, total, kills),
      caballeros: killByWave(caballeros, total, kills),
    };
    
    return {
      ...defender,
      ...{
        bajas,
        ejercito: {
          simples: simples - bajas.simples,
          entrenadas: entrenadas - bajas.entrenadas,
          caballeros: caballeros - bajas.caballeros,
        }
      }
    }

  }

  const calculateBattle = (battle) => {
    const lastBattle = combats?.slice(-1)?.[0] || {};
    const player1 = {...lastBattle.player1 || {}, ...battle.player1};
    const player2 = {...lastBattle.player2 || {}, ...battle.player2};

    return {
      player1: doRaid(player1, player2),
      player2: doRaid(player2, player1)
    }
  };

  const nextTurn = (battle) => {
    const {player1, player2 } = calculateBattle(battle);
    combats.push({
      player1,
      player2,
      turn,
      createdAt: new Date()
    });
    setTurn(turn + 1);
  };

  const finishBattle = () => {
    setCombats([]);
    setTurn(0);
  }

  return(
    <Panel>
      { turn === 0
      ? <BattleInData onBattleStart={data => startBattle(data)}></BattleInData>
      : 
        <Panel>
          <ShowCombat turn={turn} combat={combats.slice(-1)[0]} onNextTurn={battle => nextTurn(battle)}/>
          { turn > 1 && <TablaDatos combats={combats.filter(combat => combat.turn > 0)}></TablaDatos> }
          <Button onClick={() => finishBattle()}>Finalizar</Button>
        </Panel>
      }
    </Panel>
  );
}