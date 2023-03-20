import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Inertia } from '@inertiajs/inertia';
import FlashMessages from '../FlashMessages';
import { useBrowserDatabase, PLAYER_ID } from '../../util/BrowserDatabase';
import './Layout.style.scss';

const bem = new BEMHelper('layout');

export default function Layout({ children }) {
    const { getItem } = useBrowserDatabase();
    const handleClick = () => {
        const currentPlayer = getItem(PLAYER_ID);
        const params = {};

        if (currentPlayer) {
            params.player_id = currentPlayer;
        }

        Inertia.get(route('game'), params);
    };

    const renderContent = () => {
        return children;
    };

    return (
        <main { ...bem('') }>
            <FlashMessages />
            <img
                { ...bem('logo') }
                src='/images/cube-logo.png'
                alt="SIA Cube logo"
                onClick={ handleClick }
            />
            <article { ...bem('wrapper') }>
                { renderContent() }
            </article>
        </main>
    )
}
