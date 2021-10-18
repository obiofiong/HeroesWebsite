import { useState } from "react";
import "./Card.css";
const Card = ({ hero, tags, setTags }) => {
	const [tag, setTag] = useState("");

	const tagId = hero.id;
	const tagsArray = tags[hero.id];
	// const tagsArray = ["a", "b"];
	// console.log("tags", tags);
	// console.log("tags Array", tagsArray);
	// if (tags[hero.id] !== undefined) {
	// 	tagsArray = true;
	// }

	const [toggleCard, setToggleCard] = useState(false);
	const handleToggleCard = () => {
		setToggleCard(!toggleCard);
	};
	const onTagChange = (e) => {
		setTag(e.target.value);
	};
	const handleAddTag = (e) => {
		e.preventDefault();

		if (tag.length === 0) {
			return null;
		}
		if (tagsArray) {
			const newTagList = [...tagsArray];
			newTagList.push(tag);
			let newObj = {};
			newObj[tagId] = newTagList;
			setTags({ ...tags, ...newObj });
		} else {
			let newObj = {};
			const newTagList = [];
			newTagList.push(tag);
			newObj[tagId] = newTagList;
			setTags({ ...tags, ...newObj });
		}
		setTag(""); // clear the input field
	};
	return (
		<div className={toggleCard ? "card card-expanded" : "card"}>
			<div className="expand-icon" onClick={handleToggleCard}>
				+
			</div>
			<div className="image">
				<img src={hero.images.md} alt={`hero-${hero.name}`} />
			</div>
			<div
				className={toggleCard ? "hero-details-active" : "hero-details"}
			>
				<div>
					<h3 className="hero-name">{hero.name}</h3>
					<p> Full name: {hero.biography.fullName} </p>
					<p>Race: {hero.appearance.race} </p>
					<p> Alignment: {hero.biography.alignment} </p>
					<p>Publisher: {hero.biography.publisher} </p>
				</div>
				{/* {toggleCard && ( */}
				<div className={toggleCard ? "powers-active" : "powers"}>
					<div>
						<h3 className="powers-heading">Powers</h3>
						{Object.keys(hero.powerstats).map((power, i) => {
							return (
								<p key={i}>
									{power} : {hero.powerstats[`${power}`]}
								</p>
							);
						})}
					</div>
					<div className="tags-section">
						<h3 className="powers-heading">Tags</h3>
						<form className="tag-input">
							<input
								type="text"
								onChange={(e) => onTagChange(e)}
								value={tag}
							/>
							<button
								onClick={(e) => handleAddTag(e)}
								className="btn"
							>
								Add Tag
							</button>
						</form>
						{tagsArray && (
							<div className="tags">
								Tags :
								{tagsArray.map((name, i) => {
									return (
										<span key={i} className="tag">
											{name}
										</span>
									);
								})}
							</div>
						)}
					</div>
				</div>
				{/* // )} */}
			</div>
		</div>
	);
};

export default Card;
