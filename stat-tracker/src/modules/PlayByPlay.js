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
import Typography from '@mui/material/Typography';


function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export default function PlayByPlay( {playByPlay} ) {

	return (
		<Grid container item spacing={2} justifyContent="center" sx={{marginTop: '30px'}}>
			<Grid container justifyContent="center" item md={12}>
				<Typography sx={{fontSize: '24px', fontWeight: 'bold'}}>
					Play-by-Play
				</Typography>
			</Grid>
			<Grid container justifyContent="center" item md={12}>
			{
				playByPlay.length === 0 ? 
					<Typography>
						No plays yet...
					</Typography>
					:
					<TableContainer sx={{maxWidth: 950}} component={Paper}>
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
								{playByPlay.slice(0).reverse().map(play => {
									return(
									<TableRow key={play.description + play.period + play.clock}>
										<TableCell className="fade-in" sx={{fontWeight: 'bold'}}>{play.period}</TableCell>
										<TableCell className="fade-in" sx={{fontWeight: 'bold'}}>{play.clock}</TableCell>
										<TableCell className="fade-in" sx={{fontWeight: 'bold'}}>{play.team}</TableCell>
										<TableCell className="fade-in" sx={{fontWeight: 'bold'}}>{play.description}</TableCell>
									</TableRow>
									)
								})}
								
							</TableBody>
						</Table>
					</TableContainer>
			}
			</Grid>
		</Grid>
		)
}