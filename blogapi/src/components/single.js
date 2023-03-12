import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function Post() {
	const { id } = useParams();
	const classes = useStyles();

	const [value, setValue] = useState("")

    function handlechange(e) {
        console.log(e.target.value)
        setValue(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    
        axiosInstance.post(`question/${id}/answers/`,{
            text:value
          }).then((response)=>{
            console.log(response)
    
        })
    }
	const [value1, setValue1] = useState("")

    function handlechange1(e) {
        console.log(e.target.value)
        setValue1(e.target.value)
    }
    const handleSubmit1=(e)=>{
        e.preventDefault()
    
        axiosInstance.post(`question/${id}/comments/`,{
            text:value1
          }).then((response)=>{
            console.log(response)
    
        })
    }

	const [data, setData] = useState({});
	const [Answers, setAnswers] = useState([]);
	const [Comments, setComments] = useState([]);
	useEffect(() => {
		axiosInstance.get(`question/${id}/`).then((res) => {
			console.log(res.data);
			setAnswers(res.data.answers)
			setComments(res.data.comments)
			console.log(Answers);
			console.log(Comments);
			setData(res.data);
		});

	}, [setData]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}></div>
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						{data.text}
					</Typography>
					{/* {data.answers.map((answer)=>{
							{console.log(answer)}
						})} */}
					{/* {data.answers} */}
					{Answers.map((ans) => {
						console.log(Answers)
						return (
							<Typography
								variant="h5"
								align="center"
								color="textSecondary"
								paragraph
							>
								{ans.text}
							</Typography>
						);
					})}
					
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						add a new answer
						<input
							type='text'
							value={value}
							onChange={handlechange}
							className="border-2 border-green-500 p-2 rounded-lg"
						/>
						<button
							onClick={handleSubmit}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						/>
					</Typography>
					{Comments.map((ans) => {
						console.log(Comments)
						return (
							<Typography
								variant="h5"
								align="center"
								color="textSecondary"
								paragraph
							>
								{ans.text}
							</Typography>
						);
					})}

					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						add a new comment
						<input
							type='text'
							value={value1}
							onChange={handlechange1}
							className="border-2 border-green-500 p-2 rounded-lg"
						/>
						<button
							onClick={handleSubmit1}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						/>
					</Typography>
				</Container>
			</div>
		</Container>
	);
}