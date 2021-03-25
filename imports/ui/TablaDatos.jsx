import React from 'react';
import { Table, Panel } from 'rsuite';

export const TablaDatos = (props) => {

  return (
    <Panel bodyFill header="Batalla" bordered>
      <Table 
        headerHeight={80}
        data={props.combats}
      >
        <Table.Column width={70} align="center" fixed  colSpan={2}>
          <Table.HeaderCell>Turno</Table.HeaderCell>
          <Table.Cell dataKey="turn"/>
        </Table.Column>
        <Table.ColumnGroup header={`Bajas ${props.combats[0].player1.name}`}>
          <Table.Column flexGrow={1} align="center"  colSpan={2}>
            <Table.HeaderCell>Simples</Table.HeaderCell>
            <Table.Cell>{rowData => rowData.player1?.bajas?.simples || 0}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1}  align="center"  colSpan={2}>
            <Table.HeaderCell>Entrenados</Table.HeaderCell>
            <Table.Cell>{rowData => rowData.player1?.bajas?.entrenadas || 0}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1}  align="center"  colSpan={2}>
            <Table.HeaderCell>Caballeros</Table.HeaderCell>
            <Table.Cell>{rowData => rowData.player1?.bajas?.caballeros || 0}</Table.Cell>
          </Table.Column>
        </Table.ColumnGroup>
        <Table.ColumnGroup header={`Bajas ${props.combats[0].player2.name}`}>
          <Table.Column flexGrow={1}  align="center"  colSpan={2}>
            <Table.HeaderCell>Simples</Table.HeaderCell>
            <Table.Cell>{rowData => rowData.player2?.bajas?.simples || 0}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1}  align="center"  colSpan={2}>
            <Table.HeaderCell>Entrenados</Table.HeaderCell>
            <Table.Cell>{rowData => rowData.player2.bajas?.entrenadas || 0}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1}  align="center"  colSpan={2}>
            <Table.HeaderCell>Caballeros</Table.HeaderCell>
            <Table.Cell>{rowData => rowData.player2?.bajas?.caballeros || 0}</Table.Cell>
          </Table.Column>
        </Table.ColumnGroup>
      </Table>
    </Panel>
  );
};