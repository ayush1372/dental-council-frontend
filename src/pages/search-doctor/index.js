import { useState } from 'react';

import { Box, Container, Tab, Tabs } from '@mui/material';

import AdvanceSearch from './components/advance-search';
import BlacklistedDoctor from './components/blacklisted-doctor';
import Name from './components/name';
import RegistrationNumber from './components/registration-number';
import StateMedicalCouncil from './components/state-medical-council';
import SuspendedDoctor from './components/suspended-doctor';
import YearOfRegistration from './components/year-of-registraation';

const tabNames = {
  Name: Name,
  'Year Of Registration': YearOfRegistration,
  'Registration Number': RegistrationNumber,
  'State Medical Council': StateMedicalCouncil,
  'Advance Search': AdvanceSearch,
  'Blacklisted Doctor': BlacklistedDoctor,
  'Suspended Doctor': SuspendedDoctor,
};

const SearchDoctor = () => {
  const [doSearch, setDoSearch] = useState(false);
  const [tabValue, setTabValue] = useState('Advance Search');
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const Component = tabNames[tabValue];
  return (
    <Container maxWidth="lg">
      {!doSearch ? (
        <Box>
          <Box sx={{ boxShadow: '0px 3px 6px #00000014;' }} mt={6}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                '.MuiTabs-flexContainer': {
                  button: {
                    borderBottom: '5px solid',
                    borderBottomColor: 'grey1.main',
                    backgroundColor: 'backgroundColor.light',
                  },
                  'button.Mui-selected': {
                    backgroundColor: 'white.main',
                  },
                },
                '.MuiTabs-indicator': {
                  borderBottom: '4px solid',
                  borderBottomColor: 'inputFocusColor.main',
                },
              }}
            >
              {Object.keys(tabNames).map((tabName) => (
                <Tab value={tabName} label={tabName} key={tabName}></Tab>
              ))}
            </Tabs>
          </Box>
          <Box sx={{ boxShadow: '0px 3px 6px #00000014;' }} p={2}>
            <Component setDoSearch={setDoSearch} />
          </Box>
        </Box>
      ) : (
        <div>search Results</div>
      )}
    </Container>
  );
};
export default SearchDoctor;
