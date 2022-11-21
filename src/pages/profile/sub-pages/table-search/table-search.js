import styles from './table-search.module.scss';

export function TableSearch() {
  return (
    <div className={styles.main} data-testid="table-search">
      <header>
        <h1>{'Welcome to table-search Page'}</h1>
      </header>
    </div>
  );
}

export default TableSearch;
