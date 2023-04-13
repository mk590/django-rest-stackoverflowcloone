import styled from 'styled-components';
import {useState,useEffect} from 'react';
import QuestionRow from "./QuestionRow";
import Header1 from "./Header1";
// import BlueButtonLink from "./BlueButtonLink";
import axiosInstance from '../axios';
import {Helmet} from "react-helmet";
import Add_ques from './add_ques';

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  padding: 30px 20px;
`;

function QuestionsPage() {
  const [questions,setQuestions] = useState([]);
  useEffect(() => {
		axiosInstance.get('questions').then((res) => {
			setQuestions(res.data);
			console.log(res.data);
		});
	}, []);
  return (
    <main>
      <Helmet>
        <title>StackOvercloned - home</title>
      </Helmet>
      <HeaderRow>
        <Header1 style={{margin:0}}>Questions</Header1>
        {/* <BlueButtonLink to={'/ask'}>Ask&nbsp;Question</BlueButtonLink> */}
      </HeaderRow>
      {questions && questions.length > 0 && questions.map(question => (
        <QuestionRow
          title={question.text}
          id={question.id}
          createdAt={question.created_at}
          author={{id: question.user_id, name:question.name, email:question.email}}
          // tags={question.tags}
           />
      ))}
      <Add_ques/>
    </main>
  );
}

export default QuestionsPage;