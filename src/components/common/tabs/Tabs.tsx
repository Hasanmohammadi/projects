/* eslint-disable react/jsx-props-no-spreading */
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabsCP from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import TabsStyledContainer from './Tabs.style';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabsPropsI {
  tabs: {
    name: string;
    children: JSX.Element;
    disabled?: boolean;
  }[];
  className?: string;
  activeTab: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  tabsPosition?: 'center' | 'start' | 'end';
  primaryColor?: string;
  secondaryColor?: string;
}

export default function Tabs({
  tabs,
  className,
  activeTab,
  setActiveTabIndex,
  tabsPosition,
  primaryColor,
  secondaryColor,
}: TabsPropsI) {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };

  return (
    <TabsStyledContainer
      className={className}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      primary={primaryColor}
      secondary={secondaryColor}
      component="div"
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabsCP
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          className={clsx({
            'tabs-position-center': tabsPosition === 'center',
            'tabs-position-end': tabsPosition === 'end',
          })}
          indicatorColor="primary"
        >
          {tabs?.map((tab, index) => (
            <Tab
              label={tab?.name}
              {...a11yProps(index)}
              disabled={tab.disabled}
            />
          ))}
        </TabsCP>
      </Box>
      {tabs?.map((tab, index) => (
        <TabPanel value={activeTab} index={index}>
          {tab?.children}
        </TabPanel>
      ))}
    </TabsStyledContainer>
  );
}
