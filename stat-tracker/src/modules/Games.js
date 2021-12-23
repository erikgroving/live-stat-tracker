import React from 'react';
//import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import parse from 'node-html-parser';
import axios from 'axios';

export default function Games({ games, setGames }) {
	const url = 'https://www.balldontlie.io/api/v1/games';
	
	let today = new Date();
	const offset = today.getTimezoneOffset();
	today += offset;
	
	today = new Date(today);
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();
	const date = year + '-' + month + '-' + day;
	let query = url + '/?dates[]=' + date;
	console.log(query);
	if (games.length === 0) {
		axios.get(query).then(res => {
			let g = res.data.data.map(d => {
				const homeTeam = d.home_team.full_name;
				const awayTeam = d.visitor_team.full_name;
				return {
					homeTeam: homeTeam,
					awayTeam: awayTeam
				};
			});
			setGames(g);
		});

		return (
			<p>Loading today's games...</p>
		)
	}




    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
						<TableCell>Home Team</TableCell>
						<TableCell>Away Team</TableCell>
					</TableRow>
                </TableHead>
				
				<TableBody>
					{games.map(game => 
						<TableRow>
							<TableCell>{game.homeTeam}</TableCell>
							<TableCell>{game.awayTeam}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
        </TableContainer>
    );
}