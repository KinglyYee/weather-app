import styles from "./SearchDropdownMenu.module.scss";

const SearchDropdownMenu = ({ location, setLocation }) => {
  const handleSelect = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className={styles.searchDropdownMenu}>
      <h1 className={styles.header}>Search City Weather</h1>
      <form className={styles.form}>
        <select
          value={location}
          onChange={handleSelect}
          className={styles.select}
        >
          <option value="Toronto">Toronto</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
        </select>
      </form>
    </div>
  );
};

export default SearchDropdownMenu;
