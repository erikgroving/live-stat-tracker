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

	players.sort((a, b) => a.label < b.label ? -1 : 1);
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
						if (inputVal) {
							setTrackedPlayers([...trackedPlayers, inputVal.label]);
						}
					}}
					isOptionEqualToValue={(a, b) => a.label === b.label}
				/>
			</Grid>
			
			<Grid container justifyContent="center" item md={12} alignItems="center">

				{
					<TableContainer component={Paper}>
						<Table >
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Min.</TableCell>
									<TableCell>Points</TableCell>
									<TableCell>FG</TableCell>
									<TableCell>3P</TableCell>
									<TableCell>FT</TableCell>
									<TableCell>Assists</TableCell>
									<TableCell>Rebounds</TableCell>
									<TableCell>Blocks</TableCell>
									<TableCell>Steals</TableCell>
									<TableCell>Turnovers</TableCell>
								</TableRow>
							</TableHead>
							
							<TableBody>
								{trackedPlayers.map(p =>
									{let player = playerDict[p];
									return(
										<TableRow key={p}>
											<TableCell className="fade-in">{p}</TableCell>
											<TableCell key={player.min} className="fade-in">{player.min}</TableCell>
											<TableCell key={player.points} className="fade-in">{player.points}</TableCell>
											<TableCell key={player.fga} className="fade-in">{player.fgm + '/' + player.fga}</TableCell>
											<TableCell key={player.tpa} className="fade-in">{player.tpm + '/' + player.tpa}</TableCell>
											<TableCell key={player.fta} className="fade-in">{player.ftm + '/' + player.fta}</TableCell>
											<TableCell key={player.assists} className="fade-in">{player.assists}</TableCell>
											<TableCell key={player.totReb} className="fade-in">{player.totReb}</TableCell>
											<TableCell key={player.blocks} className="fade-in">{player.blocks}</TableCell>
											<TableCell key={player.steals} className="fade-in">{player.steals}</TableCell>
											<TableCell key={player.turnovers} className="fade-in">{player.turnovers}</TableCell>
										</TableRow>
									)
									}
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