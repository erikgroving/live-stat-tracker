import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export default function PlayerTracker( {playerDict} ) {


    const [trackedPlayers, setTrackedPlayers] = useState([]);

	if (isEmptyObject(playerDict)) {
		return (
			<Grid container justifyContent="center">Loading player stats... (Ensure games have started)</Grid>
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

	const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

	players.sort((a, b) => a.label < b.label ? -1 : 1);
	console.log(trackedPlayers);
	return (
		<>
		<Grid container item justifyContent="center">
			<h1>Live Stat Tracker</h1>
		</Grid>
		<Grid container spacing={2} justifyContent="center" style={{paddingTop: '50px'}}>
			<Grid item>
				<Autocomplete
					blurOnSelect
					options={players}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Search for Player" variant="standard"/>}
					onChange={ (_, inputVal) => {
						console.log(inputVal);
						console.log(inputVal.stats);
						setTrackedPlayers([...trackedPlayers, inputVal]);
					}}
					isOptionEqualToValue={(a, b) => a.label === b.label}
				/>
			</Grid>
			
			<Grid container justifyContent="center" item md={12}>

				{
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Points</TableCell>
									<TableCell>Assists</TableCell>
									<TableCell>Rebounds</TableCell>
									<TableCell>FG/M</TableCell>
									<TableCell>FG/A</TableCell>
									<TableCell>3P/M</TableCell>
									<TableCell>3P/A</TableCell>
									<TableCell>Blocks</TableCell>
									<TableCell>Steals</TableCell>
									<TableCell>Turnovers</TableCell>
								</TableRow>
							</TableHead>
							
							<TableBody>
								{trackedPlayers.map(player =>
									<TableRow key={player.label}>
										<TableCell>{player.label}</TableCell>
										<TableCell>{player.stats.points}</TableCell>
										<TableCell>{player.stats.assists}</TableCell>
										<TableCell>{player.stats.totReb}</TableCell>
										<TableCell>{player.stats.fgm}</TableCell>
										<TableCell>{player.stats.fga}</TableCell>
										<TableCell>{player.stats.tpm}</TableCell>
										<TableCell>{player.stats.tpa}</TableCell>
										<TableCell>{player.stats.blocks}</TableCell>
										<TableCell>{player.stats.steals}</TableCell>
										<TableCell>{player.stats.turnovers}</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>

				}
			</Grid>
		</Grid>
		</>
	)
}