import React from 'react';
import { Divider, Text, TopNavigation } from '@ui-kitten/components';
import PostStyle1 from '../../components/posts/PostStyle1';
import { BaseLayout } from '../../components';

export default () => (
    <>
        <TopNavigation title='MyApp' alignment='center'/>
        <Divider/>
        <BaseLayout>
            <PostStyle1 />
        </BaseLayout>
    </>
)
