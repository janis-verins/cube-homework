import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react'
import BEMHelper from 'react-bem-helper';
import { useBrowserDatabase, PLAYER_ID } from '../../util/BrowserDatabase';

const buttonBem = new BEMHelper('button');

export default function Home() {
    const { getItem } = useBrowserDatabase();
    const {
        new_game = false
    } = usePage().props;

    const getData = () => {
        const currentPlayer = getItem(PLAYER_ID);
        const data = {};

        if (currentPlayer && !new_game) {
            data.player_id = currentPlayer;
        }

        return data;
    };

    return (
        <>
            <h1>Welcome to SIA CUBE Trivia quiz!</h1>
            <Link
                { ...buttonBem('main') }
                href={ route('question') }
                data={ getData() }
            >
                <span>{ new_game ? 'Start the quiz' : 'Continue the quiz' }</span>
            </Link>
        </>
    );
}
