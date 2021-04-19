import React, { useState } from 'react'

const QuestionContext = React.createContext()

export const QuestionConsumer = QuestionContext.Consumer

export function QuestionProvider (props) {
    const [adminId, setAdminId] = useState('admin')
    const [subjectCode, setSubjectCode] = useState('')
    const [questions, setQuestions] = useState([])

    return (
        <QuestionContext.Provider value={ {
            adminId,
            subjectCode,
            questions,
            setAdminId,
            setSubjectCode,
            setQuestions
        } }>
            { props.children }
        </QuestionContext.Provider>
    )
}

export default QuestionContext