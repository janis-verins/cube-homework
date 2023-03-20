import React, { useEffect, useState } from 'react';
import { usePage, useForm, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import BEMHelper from 'react-bem-helper';
import Answer from '../../components/Answer';
import { useBrowserDatabase, PLAYER_ID } from '../../util/BrowserDatabase';
import './Question.style.scss';

const bem = new BEMHelper('question');
const buttonBem = new BEMHelper('button');

export default function Question() {
    const { setItem, getItem, deleteItem } = useBrowserDatabase();
    const [answered, setAnswered] = useState(false);
    const [playerId, setPlayerId] = useState(getItem(PLAYER_ID));
    const {
        question: {
            question = '',
            id = '',
            answers = []
        } = {},
        results,
        correct_answer,
        player_id
    } = usePage().props;
    const { data, setData, post } = useForm({
        answer: '',

        // NOTE: When working with Laravel PUT/PATCH requests and FormData
        // you SHOULD send POST request and fake the PUT request like this.
        _method: 'PUT'
    });
    const currentPlayed = getItem(PLAYER_ID);

    useEffect(() => {
        if (!playerId && player_id) {
            setItem(player_id, PLAYER_ID);
            setPlayerId(player_id);

            Inertia.reload({ data: { player_id: player_id }, preserveState: true, replace: true });
        }
    }, []);

    useEffect(() => {
        if (results) {
            deleteItem(PLAYER_ID);
        }
    }, [results])

    function handleSubmit(e) {
        e.preventDefault();

        post(route('question.answer', id), {
            onFinish: () => {
                setAnswered(true);
            }
        });
    }

    const handleSelectAnswer = (answer) => {
        setData('answer', answer);
    };

    const renderQuestion = () => {
        const formattedQuestion = question.charAt(0).toUpperCase() + question.slice(1);

        return (
            <h1>{ `${formattedQuestion}?` }</h1>
        );
    };

    const renderAnswers = () => {
        return (
          <div { ...bem('answers') }>
              { answers.map(renderAnswer) }
          </div>
        );
    };

    const renderAnswer = (answer) => {
        return (
            <Answer
                answer={ answer }
                answered={ answered }
                onClick={ handleSelectAnswer }
                selected={ answer === data.answer }
                correctAnswer={ correct_answer }
            />
        );
    };

    const renderActionButton = () => {
        if (results) {
            return null;
        }

        if (data.answer && answered) {
            return (
                <Link
                    { ...buttonBem('main') }
                    data={ { player_id: currentPlayed } }
                    replace
                >
                    Next
                </Link>
            );
        }

        return (
            <button
                { ...buttonBem('main') }
                onClick={ handleSubmit }
                disabled={ !data.answer  }
            >
                Answer
            </button>
        );
    };

    const renderResults = () => {
        if (!results) {
            return null;
        }

        const title = !correct_answer ?
            'Congratulations, you have won the CUBE Trivia quiz!' :
            'You lost :/, I know you will succeed next time!';

        return (
            <div { ...bem('results') }>
                <div { ...bem('results-message') }>
                    <p { ...bem('results-title', correct_answer ? 'error' : '') } >{ title }</p>
                    <span>{ `Results: ${ results }` }</span>
                </div>
                <Link
                    href={ route('game') }
                    { ...buttonBem('main') }
                    replace
                >
                    Try again
                </Link>
            </div>
        );
    };

    return (
        <>
            { renderQuestion() }
            { renderAnswers() }
            { renderActionButton() }
            { renderResults() }
        </>
    );
}
