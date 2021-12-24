import React from 'react';
//import { useState } from 'react';
/*import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';*/
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export default function PlayerTracker( {playerDict} ) {

	if (isEmptyObject(playerDict)) {
		return (
			<p>Loading player stats...</p>
		)
	}

	let players = [];

	for (const playerName in playerDict) {
		const player = playerDict[playerName];
		players.push({
			label: player.firstName + ' ' + player.lastName,
			stats: player
		});
	}

	players.sort((a, b) => a.label < b.label ? -1 : 1);

	return (
		<Grid container>
			<Grid item>
				<Autocomplete
					blurOnSelect
					options={players}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Search for Player" variant="standard"/>}
					onChange={ (event, inputVal) => {
						console.log(inputVal);
					}}
				/>
			</Grid>
			<Grid item>
				<Button variant="outlined">Track Player</Button>
			</Grid>
			
		</Grid>
	)
}