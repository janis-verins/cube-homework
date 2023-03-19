import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

InertiaProgress.init({
    color: '#ff6700',
    showSpinner: false
});

createInertiaApp({
    resolve: name => {
        return require(`./pages/${name}`).default;
    },
    setup({ el, App, props }) {
        render(<App { ...props } />, el)
    }
});
