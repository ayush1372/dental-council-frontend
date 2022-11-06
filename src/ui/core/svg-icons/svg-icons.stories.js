import React from 'react';

import chunk from 'lodash/chunk';

import { ICONS_NAME_LIST, SvgImageComponent } from '.';

import styles from './svg-icons.module.scss';

export default {
  title: 'Icons',
  component: SvgImageComponent,
};

export const Default = () => (
  <p>
    <table className={styles.table}>
      {chunk(ICONS_NAME_LIST, 8).map((line, idx) => (
        <React.Fragment key={idx}>
          <tr>
            {line.map((icon) => (
              <td key={icon}>
                <div className={styles.wrapper}>
                  <SvgImageComponent key={icon} icon={icon} className="icon" />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            {line.map((icon) => (
              <th key={icon}>{icon}</th>
            ))}
          </tr>
        </React.Fragment>
      ))}
    </table>
  </p>
);
