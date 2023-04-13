import {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Header1 from "./Header1";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
// import Tag from "./Tag";
// import WhoAndWhen from "./WhoAndWhen";
import UserLink from "./UserLink";
import VotingButtons from "./VotingButtons";
import Comments from "./Comments";
import Header2 from "./Header2";
import PostBodyTextarea from "./PostBodyTextarea";
import BlueButton from "./BlueButton";
import When from "./When";
import {Helmet} from "react-helmet";
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';

const Container = styled.div`
  padding: 30px 20px;
`;
const QuestionMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const QuestionTitle = styled(Header1)`
  border-bottom: 1px solid rgba(255,255,255,.1);
  padding-bottom: 10px;
`;
const PostBody = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  column-gap: 20px;
  margin-bottom: 20px;
`;

function QuestionPage({match}) {
  const { id } = useParams();
  // const [data, setData] = useState({});
  const [question,setQuestion] = useState("");
  const [answerBody,setAnswerBody] = useState("");
  const [questionComments,setQuestionComments] = useState([]);
  const [answers,setAnswers] = useState([]);

  useEffect(() => {
		axiosInstance.get(`question/${id}/`).then((res) => {
			console.log(res.data);
			setAnswers(res.data.answers)
			console.log(answers);
			setQuestionComments(res.data.comments)
			console.log(questionComments);
      setQuestion(res.data.text);
		});

	}, []); 

  
  
  function handlechange(e) {
    console.log(e.target.value)
    setAnswerBody(e.target.value)
}
const handleSubmit=(e)=>{
    e.preventDefault()

    axiosInstance.post(`question/${id}/answers/`,{
        text:answerBody
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


  return (
    <>
      <Container>
        {question && (
          <>
            <Helmet>
              {/* <title>{question} - StackOvercloned</title> */}
              <title>{question} </title>
            </Helmet>
            <QuestionTitle>{question}</QuestionTitle>
            <PostBody>
              {/* <VotingButtons style={{marginTop:'10px'}}
                            //  initialTotal={voteCount}
                            //  initialUserVote={userVote}
                             initialTotal={0}
                             initialUserVote={0}
                             postId={question.id} /> */}
              <div>
                {/* <ReactMarkdown plugins={[gfm]} children={question.content} /> */}
                <QuestionMeta>
                  {/* <div>
                    {tags.map(tag => (
                      <Tag key={'tag'+tag.id} name={tag.name} />
                    ))}
                  </div> */}
                  {/* <WhoAndWhen><When>{question.created_at}</When> */}
                   {/* <UserLink>{question.name || question.email}</UserLink> */}
                   {/* </WhoAndWhen> */}
                </QuestionMeta>
              </div>
            </PostBody>
          </>
        )}

        {/* {questionComments && (
          <Comments initialComments={questionComments} postId={question.id} />
        )} */}



<hr/>
<h3>Comments</h3>

{questionComments.map((ans) => {
						console.log(questionComments)
						return (
							<>

<ul class="list-group" style={{"list-style-type": "none"}}>
  <li class="list-group-item">{ans.text}</li>

</ul>
								
              </>
						);
					})}

<Header2 style={{margin:'30px 0 20px'}}>Your Comment</Header2>
<input
							type='text'
							value={value1}
							onChange={handlechange1}
							className="border-2 border-green-500 p-2 rounded-lg"
						/>
        <BlueButton onClick={handleSubmit}>Post your comment</BlueButton>

<hr/>
<h3>Answers</h3>
        {answers.map(answer => (
          <div>
           
              {/* <VotingButtons style={{marginTop:'10px'}}
                             initialTotal={answer.votes_sum}
                             initialUserVote={answer.user_vote}
                             postId={answer.id} /> */}
              <div>
                {/* <ReactMarkdown plugins={[gfm]} children={answer.text} /> */}
                <ul class="list-group" style={{"list-style-type": "none"}} >
  <li class="list-group-item">{answer.text}</li>

</ul>
                {/* {answer.text} */}
                {/* <WhoAndWhen style={{float:'none',width:'100%'}}>
                  <When>{answer.created_at}</When>&nbsp;
                  <UserLink id={answer.author_id}>{answer.user_name || answer.email}</UserLink>
                </WhoAndWhen> */}
              </div>
            
            {/* <Comments
              initialComments={answersComments.filter(comment => comment.parent_id === answer.id)}
              postId={answer.id} /> */}
          </div>
        ))}

        <hr/>
        <Header2 style={{margin:'30px 0 20px'}}>Your Answer</Header2>
        {/* <PostBodyTextarea
          value={answerBody}
          placeholder={'Your answer goes here. You can use markdown'}
          onchange={handlePostBodyChange} /> */}
          <input
							type='text'
							value={answerBody}
							onChange={handlechange}
             
							className="border-2 border-green-500 p-2 rounded-lg"
						/>
        <BlueButton onClick={handleSubmit}>Post your answer</BlueButton>
      </Container>
    </>
  );
}

export default QuestionPage;