import React from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


import { useState } from 'react';

const isScoringPlay = (playDesc) => {
	return playDesc.includes('PTS');
};

const isTrackedPlayer = (playDesc, trackedPlayers) => {
	if (!trackedPlayers) {
		return;
	}
	let lastNames = [];
	for (let player of trackedPlayers) {
		lastNames.push(player.split(' ', 2)[1]);
	}
	for (let lastName of lastNames) {
		if (playDesc.includes(lastName)) {
			return true;
		}
	}

	return false;
};

const isTrackedPlayerTeam = (play) => {
	return true;
};

function isValidPlay(play, scoringPlaysOnly, trackedPlayersOnly, trackedTeamsOnly, trackedPlayers) {
	if (scoringPlaysOnly && !isScoringPlay(play.description)) {
		return false;
	}

	if (trackedPlayersOnly && !isTrackedPlayer(play.description, trackedPlayers)) {
		return false;
	}

	if (trackedTeamsOnly && !isTrackedPlayerTeam(play)) {
		return false;
	}

	return true;
}

const handleChange = (event, setter) => {
	setter(event.target.checked);
};

export default function PlayByPlay( {playByPlay, trackedPlayers} ) {


    const [scoringPlaysOnly, setScoringPlaysOnly] = useState(false);
    const [trackedPlayersOnly, setTrackedPlayersOnly] = useState(false);
	const [trackedTeamsOnly, setTrackedTeamsOnly] = useState(false);

	let plays = [];
	for (let play of playByPlay) {
		if (isValidPlay(play, scoringPlaysOnly, trackedPlayersOnly, trackedTeamsOnly, trackedPlayers)) {
			plays.push(play);
		}
	}
	console.log(trackedPlayers);
	return (
		<Grid container item spacing={2} justifyContent="center" sx={{marginTop: '30px'}}>
			<Grid container justifyContent="center" item md={12}>
				<Typography sx={{fontSize: '24px', fontWeight: 'bold'}}>
					Play-by-Play
				</Typography>
			</Grid>
			<Grid container justifyContent="Center" item md={12}>
				<FormControlLabel
					control={
						<Switch
							checked={scoringPlaysOnly}
							onChange={(event) => handleChange(event, setScoringPlaysOnly)}
						/> 
					}
					label="Scoring Plays Only"
				/>
				
				<FormControlLabel
					control={
						<Switch
							checked={trackedPlayersOnly}
							onChange={(event) => handleChange(event, setTrackedPlayersOnly)}
						/> 
					}
					label="Tracked Players Only"
				/>
				
				<FormControlLabel
					control={
						<Switch
							checked={trackedTeamsOnly}
							onChange={(event) => handleChange(event, setTrackedTeamsOnly)}
						/> 
					}
					label="Tracked Teams Only"
				/>
				</Grid>

			<Grid container justifyContent="center" item md={12}>
			{
				playByPlay.length === 0 ? 
					<Typography>
						No plays yet...
					</Typography>
					:

					<TableContainer sx={{maxWidth: 950, maxHeight:600}} component={Paper}>
						<Table >
							<TableHead>
								<TableRow>
									<TableCell>Quarter</TableCell>
									<TableCell>Clock</TableCell>
									<TableCell>Team/Score</TableCell>
									<TableCell>Description</TableCell>
								</TableRow>
							</TableHead>
							
							<TableBody>
								{plays.slice(plays.length - Math.min(plays.length, 100)).reverse().map(play => {
									return (
										<TableRow key={play.event + play.description + play.period + play.clock}>
											<TableCell className="fade-in" sx={{fontWeight: 'bold'}}>{play.period}</TableCell>
											<TableCell className="fade-in" sx={{fontWeight: 'bold'}}>{play.clock}</TableCell>
											<TableCell className="fade-in" sx={{fontWeight: 'bold'}}>{play.team}</TableCell>
											<TableCell className="fade-in" sx={{fontWeight: 'bold'}}>{play.description}</TableCell>
										</TableRow>
									);
								})}
								
							</TableBody>
						</Table>
					</TableContainer>
			}
			</Grid>
		</Grid>
		)
}
