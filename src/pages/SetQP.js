import React from 'react'
import QuestionContext, { QuestionConsumer, QuestionProvider } from '../context/QuestionContext'
import '../css/SetQP.css'
import axios from 'axios'

class SetQP extends React.Component {
    render () {
        return (
            <QuestionProvider>
                <RenderSetQP />
            </QuestionProvider>
        )
    }

}

class RenderSetQP extends React.Component {
    static contextType = QuestionContext

    constructor (props) {
        super(props);
        this.state = {
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
            url: ''
        }
    }

    handleSubChange = (event) => {
        this.context.setSubjectCode(event.target.value)
    }

    handleQuestionChange = (event) => {
        this.setState({
            question: event.target.value
        })
    }

    handleOption1Change = (event) => {
        this.setState({
            option1: event.target.value
        })
    }
    handleOption2Change = (event) => {
        this.setState({
            option2: event.target.value
        })
    }
    handleOption3Change = (event) => {
        this.setState({
            option3: event.target.value
        })
    }
    handleOption4Change = (event) => {
        this.setState({
            option4: event.target.value
        })
    }

    handleAnswerChange = (event) => {
        this.setState({
            answer: event.target.value
        })
    }

    handleNext = () => {
        let err = 0
        if(this.context.subjectCode === ''){
            alert('Subject Code is empty')
            err = 1
        }
        if(this.state.question === ''){
            alert('Question is empty')
            err = 1
        }if(this.state.option1 === ''){
            alert('Option1 is empty')
            err = 1
        }if(this.state.option2 === ''){
            alert('Option2 is empty')
            err = 1
        }if(this.state.option3 === ''){
            alert('Option3 is empty')
            err = 1
        }if(this.state.option3 === ''){
            alert('Option4 is empty')
            err = 1
        }if(this.state.answer === ''){
            alert('Answer is empty')
            err = 1
        }
        if(err === 0){
            let question = {
                question: this.state.question,
                option1: this.state.option1,
                option2: this.state.option2,
                option3: this.state.option3,
                option4: this.state.option4,
                answer: this.state.answer
            }
            this.context.setQuestions([
                ...this.context.questions, question
            ])

            this.setState({
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                answer: ''
            })
            alert('question added')
        }
    }

    handleSubmit = () => {
        console.log({
            adminId: this.context.adminId,
            subjectCode: this.context.subjectCode,
            questions: this.context.questions
        })
        axios({
            method: 'post',
            url: 'http://localhost:5000/exam',
            data: {
                adminId: this.context.adminId,
                subjectCode: this.context.subjectCode,
                questions: this.context.questions
            }
        }).then( (res) => {
            console.log(res.data)
            this.setState({
                url: "http://localhost:3000/view-questions/" + this.context.subjectCode
            })
            this.context.setQuestions([])
            alert('Question Paper Added')
        })
    }


    render () {
        return (
            <QuestionConsumer>
                {
                    props => {
                        return (
                            <div className={ 'set-questions' }>
                                <div className={ 'header' }>
                                    MILO APP
                                </div>
                                <div className={ 'question' }>
                                    <div className={ 'set-subject' }>
                                        <input type="text" className={ 'subject' } onChange={ this.handleSubChange }
                                               value={ props.subjectCode } placeholder="Subject Code" />
                                    </div>
                                    <div className={ 'title' }>
                                        Set Question Paper
                                    </div>
                                    <div className={ 'admin-id' }>
                                        { props.adminId }
                                    </div>
                                    <div className={ 'form' }>
                                        <div className={ 'question-container' }>
                                            <div className={ 'label' }>Question:</div>
                                            <textarea className={ 'question' } onChange={this.handleQuestionChange} value={this.state.question} />
                                        </div>
                                        <div className={'options1-container'}>
                                            <div className={'label'}>Option 1: </div>
                                            <input type='text' value={this.state.option1} onChange={this.handleOption1Change} />
                                        </div>
                                        <div className={'options2-container'}>
                                            <div className={'label'}>Option 2: </div>
                                            <input type='text' value={this.state.option2} onChange={this.handleOption2Change} />
                                        </div>
                                        <div className={'options3-container'}>
                                            <div className={'label'}>Option 3: </div>
                                            <input type='text' value={this.state.option3} onChange={this.handleOption3Change} />
                                        </div>
                                        <div className={'options4-container'}>
                                            <div className={'label'}>Option 4: </div>
                                            <input type='text' value={this.state.option4} onChange={this.handleOption4Change} />
                                        </div>
                                        <div className={'answer-container'}>
                                            <div className={'label'}>Answer: </div>
                                            <input type='text' value={this.state.answer} onChange={this.handleAnswerChange} />
                                        </div>
                                        <div className={'buttons'}>
                                            <div className={'next-button'}>
                                                <button className={'next'} onClick={this.handleNext}>Next</button>
                                            </div>
                                            <div className={'submit-button'}>
                                                <button className={'next'} onClick={this.handleSubmit}>Submit</button>
                                            </div>
                                        </div>
                                        <div className={'display-url'}>
                                            URL for recently added Question paper: <a href={this.state.url}>{this.state.url}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </QuestionConsumer>

        )
    }
}

export default SetQP