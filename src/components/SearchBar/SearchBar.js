import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
	const handleChange = (e) => {
		props.setQuery(e.target.value);
	};

	return (
		<div className="search-bar">
			<input
				onChange={(e) => handleChange(e)}
				placeholder="Search by Name"
				type="text"
				value={props.query}
			/>
		</div>
	);
}

export default SearchBar;
