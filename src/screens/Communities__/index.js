import React from 'react';
import { BaseLayout } from '../../components';
import { Text } from '@ui-kitten/components';
import { LayoutList } from './list';
import { data } from './data';

export default ({ navigation })  => {

  const onItemPress = (index) => {
    navigation.navigate(data[index].route);
  };

  return (
    <BaseLayout>
        <LayoutList
            data={data}
            onItemPress={onItemPress}
        />    
    </BaseLayout>
  );
};
