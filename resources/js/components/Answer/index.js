import React from 'react';
import BEMHelper from 'react-bem-helper';
import './Answer.style.scss';

const bem = new BEMHelper('answer');

export default function Answer({ answer, answered, onClick, selected, correctAnswer }) {
    const getSelectStyle = () => {
        if (answered && !correctAnswer && selected) {
            return 'success';
        }

        if (answered && correctAnswer && answer.toString() === correctAnswer.toString()) {
            return 'success';
        }

        if (answered && correctAnswer && answer !== correctAnswer) {
            return 'error';
        }

        if (selected) {
            return 'selected';
        }

        return '';
    };

    return (
        <button
            { ...bem('', getSelectStyle()) }
            onClick={ () => onClick(answer) }
            disabled={ answered }
        >
            { answer }
        </button>
    );
}
