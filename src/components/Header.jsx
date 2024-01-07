import { MoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Flex, Grid } from 'antd';
import { Header as AntDHeader } from 'antd/es/layout/layout';
import { isLargerThanLG } from '../utils/antd.utils';
import { useEffect, useState } from 'react';

export default function Header({ onTriggerSiderIconClicked }) {
  const screens = Grid.useBreakpoint();
  const [isLargerThanLGScreen, setIsLargerThanLGScreen] = useState(
    isLargerThanLG(screens)
  );

  useEffect(() => {
    setIsLargerThanLGScreen(isLargerThanLG(screens));
  }, [screens]);

  return (
    <AntDHeader style={triggerStyle}>
      <Flex
        justify='start'
        align='start'
      >
        {!isLargerThanLGScreen && (
          <UnorderedListOutlined
            onClick={onTriggerSiderIconClicked}
            style={triggerSiderStyle}
          />
        )}
      </Flex>
    </AntDHeader>
  );
}

const triggerSiderStyle = { fontSize: '1.5em', color: 'whitesmoke' };
const triggerStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  paddingLeft: '1em',
};
