import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
// import Header from './components1/oldheader';
import Header from './components1/header';
import Footer from './components1/footer';
import Register from './components1/register';
import Login from './components1/login';
// import Login from './components1/LoginPage';
import Logout from './components1/logout';
import Single from './oldcomp/single';
import QuestionsPage from './components1/QuestionsPage';
import QuestionPage from './components1/QuestionPage';

const routing = (
	<Router>
		<React.StrictMode>
			<Header />
			<Routes>
				{/* <Route exact path="/" element={ <App /> } /> */}
				<Route exact path="/" element={ <QuestionsPage /> } />
				<Route path="/register"  element={ <Register /> } />
				<Route path="/login" element={ <Login /> } />
				<Route path="/logout" element={ <Logout /> } />
				{/* <Route path="/question/:id" element={ <Single /> } /> */}
				<Route path="/question/:id" element={ <QuestionPage /> } />
			</Routes>
			{/* <Footer /> */}
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
