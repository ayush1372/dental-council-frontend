import { useState } from 'react';

import { Box, Container, Tab, Tabs } from '@mui/material';
import { useDispatch } from 'react-redux';

import { searchDoctor } from '../../store/reducers/doctor-search-reducer';
import AdvanceSearch from './components/advance-search';
import SearchResults from './components/doctor-search-results';
import Name from './components/name';
import RegistrationNumber from './components/registration-number';
import StateMedicalCouncil from './components/state-medical-council';
import SuspendedDoctor from './components/suspended-doctor';
import YearOfRegistration from './components/year-of-registraation';

const tabNames = {
  Name: Name,
  'Year of registration': YearOfRegistration,
  'Registration number': RegistrationNumber,
  'State medical council': StateMedicalCouncil,
  'Advance search': AdvanceSearch,

  // 'Blacklisted Doctor': BlacklistedDoctor,
  'Suspended doctor': SuspendedDoctor,
};

const SearchDoctor = () => {
  const dispatch = useDispatch();

  const [doSearch, setDoSearch] = useState(false);
  const [scrolldown, setScrollDown] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [tabValue, setTabValue] = useState('Advance search');
  const handleTabChange = (event, newValue) => {
    setSearchData({});
    dispatch(searchDoctor({ results: [], count: undefined }));
    setScrollDown(false);
    setTabValue(newValue);
  };

  const Component = tabNames[tabValue];
  return (
    <Container maxWidth="lg">
      <Box>
        <Box sx={{ boxShadow: '2' }} mt={6}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            sx={{
              '.MuiTabs-flexContainer': {
                button: {
                  borderBottom: '5px solid',
                  borderBottomColor: 'grey1.main',
                  backgroundColor: 'backgroundColor.light',
                  flexGrow: 1,
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
              <Tab
                value={tabName}
                label={tabName}
                key={tabName}
                sx={{ textTransform: 'none' }}
              ></Tab>
            ))}
          </Tabs>
        </Box>
        <Box sx={{ boxShadow: '2' }} p={2}>
          <Component
            setDoSearch={setDoSearch}
            setSearchData={setSearchData}
            setScrollDown={setScrollDown}
          />
        </Box>
      </Box>

      {doSearch && <SearchResults searchData={searchData} scrolldown={scrolldown} />}
    </Container>
  );
};
export default SearchDoctor;
