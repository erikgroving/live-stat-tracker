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

export default function PlayerTracker( {games, playerDict} ) {


    const [trackedPlayers, setTrackedPlayers] = useState([]);



	if (isEmptyObject(playerDict)) {
		if (games.length !== 0) {
			return (
				<Grid container justifyContent="center">Loading... (Or games have not started yet.) </Grid>
			)
		}
		return (
			<Grid container justifyContent="center">Loading player stats. </Grid>
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
					<TableContainer sx={{maxWidth: 950}} component={Paper}>
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
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'min' + player.min} className="fade-in">{player.min}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'points' + player.points} className="fade-in">{player.points}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'fga' +player.fga} className="fade-in">{player.fgm + '/' + player.fga}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'tpa' + player.tpa} className="fade-in">{player.tpm + '/' + player.tpa}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'fta' + player.fta} className="fade-in">{player.ftm + '/' + player.fta}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'assists' + player.assists} className="fade-in">{player.assists}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'reb' + player.totReb} className="fade-in">{player.totReb}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'block' + player.blocks} className="fade-in">{player.blocks}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'steal' + player.steals} className="fade-in">{player.steals}</TableCell>
											<TableCell sx={{fontWeight: 'bold'}} key={p + 'to' + player.turnovers} className="fade-in">{player.turnovers}</TableCell>
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