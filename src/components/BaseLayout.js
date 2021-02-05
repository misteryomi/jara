import { Layout } from '@ui-kitten/components';
import React from 'react';

export default (props) => (
    //justifyContent: 'center', alignItems: 'center',
    <Layout style={{...props.style}, { flex: 1}}>
        {props.children}
    </Layout>
)