import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import parse from 'node-html-parser';

export default function Games() {
	/*let url = 'https://www.flashscore.com/basketball/usa/nba/';
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', url)
	xhttp.send();
	xhttp.onreadystatechange = function() {
		const root = parse(xhttp.responseText);
		console.log(root.querySelector('.tabs__ear'));
	};	*/

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
						<TableCell>Today's Games</TableCell>
					</TableRow>
                </TableHead>
				
				<TableBody>
					<TableRow>
						<TableCell>Saddiq Bey</TableCell>
					</TableRow>
				</TableBody>
			</Table>
        </TableContainer>
    );
}