import React, {Component} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export class SupplierSkeleton extends Component {
  render() {
    return (
      <>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              marginLeft={20}
              marginTop={10}
              flexDirection="column">
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                marginTop={20}
              />
              <SkeletonPlaceholder.Item marginTop={6} width={130} height={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </>
    );
  }
}

export default SupplierSkeleton;
