import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { router } from '@inertiajs/react'
import Layout from './components/Layout';

InertiaProgress.init({
    color: '#FB923C',
    showSpinner: false
});

createInertiaApp({
    resolve: name => {
        const page = require(`./pages/${name}`).default;

        page.layout = (children) => <Layout children={ children } />;

        return page;
    },
    setup({ el, App, props }) {
        render(<App { ...props } />, el)
    }
});
