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
	const url = 'https://www.espn.com/nba/schedule';
	
	let query = url;
	console.log(query);
	if (games.length === 0) {
		fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
                    .then(response => {
                      if (response.ok) return response.json()
                      throw new Error('Network response was not ok.')
                    })
                    .then(data => console.log(data.contents));
                  /*
		axios.get(query).then(res => {
			console.log(res);
			let g = res.data.data.map(d => {
				const homeTeam = d.home_team.full_name;
				const awayTeam = d.visitor_team.full_name;
				return {
					homeTeam: homeTeam,
					awayTeam: awayTeam
				};
			});
			setGames(g);
		});*/

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