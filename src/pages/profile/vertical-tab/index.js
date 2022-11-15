/* eslint-disable no-console */
import { Grid } from '@mui/material';
import propTypes from 'prop-types';

import styles from './vertical-tab.module.scss';

VerticalTab.propTypes = {
  dataTabs: propTypes.array.isRequired,
  changeTab: propTypes.func.isRequired,
  activeTab: propTypes.object.isRequired,
};

export function VerticalTab(props) {
  return (
    <Grid container className={styles.verticalTabContainer}>
      {props.dataTabs.map((item, index) => {
        return (
          <Grid key={index} item xs={12}>
            <div
              onClick={() => props.changeTab(item)}
              className={
                props.activeTab.tabName === item.tabName ? styles.activeTab : styles.buttonTabs
              }
            >
              {item.title}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}
