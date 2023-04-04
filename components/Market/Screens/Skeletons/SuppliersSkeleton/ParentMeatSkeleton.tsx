import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const ParentMeatSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              flexDirection="row"
              marginRight={20}
              borderRadius={10}>
              <SkeletonPlaceholder.Item width={160} height={200} />
              <SkeletonPlaceholder.Item
                marginLeft={20}
                width={160}
                height={200}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </SkeletonPlaceholder>
    </>
  );
};

export default ParentMeatSkeleton;
