import { useState } from 'react';

import { Box, Container, Tab, Tabs } from '@mui/material';

import Name from './components/name';

const tabNames = {
  Name: Name,
  'Year Of Registration': null,
  'Registration Number': null,
  'State Medical Council': null,
  'Advance Search': null,
  'Blacklisted Doctor': null,
  'Suspended Doctor': null,
};

const SearchDoctor = () => {
  const [tabValue, setTabValue] = useState('Name');
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const Component = tabNames[tabValue];
  return (
    <Container maxWidth="lg">
      <Box>
        <Tabs value={tabValue} onChange={handleTabChange}>
          {Object.keys(tabNames).map((tabName) => (
            <Tab value={tabName} label={tabName} key={tabName}></Tab>
          ))}
        </Tabs>
      </Box>
      <Box>
        <Component />
      </Box>
    </Container>
  );
};
export default SearchDoctor;
