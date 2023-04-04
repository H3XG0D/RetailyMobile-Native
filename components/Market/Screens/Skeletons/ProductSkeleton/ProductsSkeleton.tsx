import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const ProductsSkeleton = () => {
  return (
    <ScrollView style={{height: '100%'}}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          flexWrap="wrap"
          marginLeft={5}
          gap={5}
          marginBottom={10}>
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={115}
            height={150}
            borderRadius={8}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={115}
            height={150}
            borderRadius={8}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={115}
            height={150}
            borderRadius={8}
          />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
          <SkeletonPlaceholder.Item width={115} height={150} borderRadius={8} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default ProductsSkeleton;
