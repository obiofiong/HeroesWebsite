import { useEffect, useState } from "react";
import "./ListView.css";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";
// import { fetchHeroes } from "../../utils.js/request";

const ListView = () => {
	const [data, setData] = useState([]);
	const [render, setRender] = useState([]);
	const [query, setQuery] = useState("");
	const [tags, setTags] = useState({});
	// const [tagQuery, setTagQuery] = useState("");
	const [tagList, setTagList] = useState([]);

	useEffect(() => {
		const getTags = () => {
			let listOfTags = [];
			Object.values(tags).forEach((tag) => {
				tag.forEach((tagItem) => {
					listOfTags.push(tagItem.toLowerCase());
				});
			});
			const tagListSet = [...new Set(listOfTags)];

			return tagListSet;
		};
		const response = getTags();
		setTagList(response);
	}, [tags]);

	useEffect(() => {
		const findHero = () => {
			var PATTERN = query.toLowerCase();
			const filtered = data.filter(
				(word) => word.name.toLowerCase().indexOf(PATTERN) > -1
			);
			setRender(filtered);
		};

		if (query !== 0) {
			findHero();
		}
	}, [query, data]);
	useEffect(() => {
		const fetchData = async () => {
			// const res = await fetchHeroes();
			// // console.log(res);
			// setData(res);

			fetch(
				"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
			)
				.then((response) => response.json())
				.then((data) => {
					setData(data);
					setRender(data);
				});
		};
		fetchData();
	}, []);

	const filterTags = (name) => {
		var PATTERN = name.toLowerCase();

		let keys = [];
		// Object.values(tags).map(tag => {

		// })
		Object.entries(tags).forEach(([key, value]) => {
			value.forEach((tagItem) => {
				if (tagItem.indexOf(PATTERN) > -1) {
					keys.push(key);
					// break;
				}
			});
		});

		const tagIds = [...new Set(keys)];

		const filtered = data.filter((word) => {
			return tagIds.includes(word.id.toString());
		});
		setRender(filtered);
	};

	return (
		<div className="list-view">
			<SearchBar query={query} setQuery={setQuery} />
			{Object.keys(tags).length !== 0 && (
				<div className="tags">
					{tagList.map((name, i) => {
						return (
							<span
								key={`${name}-${i}`}
								onClick={() => filterTags(name)}
								className="tag"
							>
								{name}
							</span>
						);
					})}
				</div>
			)}
			{render.map((item) => {
				return (
					<Card
						key={item.id}
						hero={item}
						tags={tags}
						setTags={setTags}
					/>
				);
			})}
		</div>
	);
};

export default ListView;
