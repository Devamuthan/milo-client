import React from 'react'
import '../css/ViewQp.css'
import axios from 'axios'

class ViewQP extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            subjectCode: props.match.params.key,
            questions: [],
            totalpages: 0,
            currentpage: 0
        }
    }

    componentDidMount () {
        axios({
            method: 'get',
            url: 'http://localhost:5000/exam/' + this.state.subjectCode
        }).then(res => {
            this.setState({
                subjectCode: res.data.EXAM_DATA.subjectCode,
                questions: res.data.EXAM_DATA.questions,
                totalpages: Math.ceil(res.data.EXAM_DATA.questions.length / 5),
                currentpage: 1
            })
            console.log(this.state)
        })
    }

    handleBack = () => {
        if(this.state.currentpage !== 1){
            this.setState({
                currentpage: this.state.currentpage - 1
            })
        }
    }

    handleNext = () => {
        if(this.state.currentpage !== this.state.totalpages){
            this.setState({
                currentpage: this.state.currentpage + 1
            })
        }
    }

    render () {
        return (

            <div className={ 'view-questions' }>
                <div className={'header'}>
                    <div className={'title'}>Question Paper</div>
                    <div className={'sub-code'}>Subject Code: {this.state.subjectCode}</div>
                </div>
                <div className={'questions'}>
                    {
                        this.state.questions.map( (question, index) => {
                            if(index < this.state.currentpage * 5 && index >= (this.state.currentpage - 1) * 5){
                                return <Question key={index} question={question.question} option1={question.option1} option2={question.option2} option3={question.option3} option4={question.option4}/>
                            }
                        } )
                    }
                </div>
                <div className={'footer'}>
                    <div className={'back'} onClick={this.handleBack}><button>{'<'}</button></div>
                    <div className={'pages'}> {this.state.currentpage} of {this.state.totalpages} </div>
                    <div className={'next'} onClick={this.handleNext}><button>{'>'}</button></div>
                </div>
            </div>
        )
    }
}

class Question extends React.Component{
    render () {
        return (
            <div className={'question-comp'}>
                <div className={'question'}>Q: {this.props.question}</div>
                <div className={'opt1'}>a: {this.props.option1}</div>
                <div className={'opt2'}>b: {this.props.option2}</div>
                <div className={'opt3'}>c: {this.props.option3}</div>
                <div className={'opt4'}>d: {this.props.option4}</div>
            </div>
        )
    }
}

export default ViewQP