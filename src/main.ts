import "./css/style.css";
import FullList from "./models/FullList";
import ListItem from "./models/ListItem";
import ListTemplate from "./template/listTemplate";

const initApp = (): void => {
	const fullList = FullList.instance;
	const template = ListTemplate.instance;

	const form = document.getElementById("itemEntryForm") as HTMLFormElement;

	form.addEventListener("submit", (e: SubmitEvent): void => {
		e.preventDefault();

		const inputEl = document.getElementById("newItem") as HTMLInputElement;
		const itemValue: string = inputEl.value.trim();
		if (!itemValue.length) {
			return;
		}

		const id: number = fullList.list.length
			? parseInt(fullList.list[fullList.list.length - 1].id) + 1
			: 1;

		const newItem = new ListItem(id.toString(), itemValue);

		fullList.addItem(newItem);
		template.render(fullList);
		inputEl.value = "";
	});

	const clearItem = document.getElementById(
		"clearItemsButton"
	) as HTMLButtonElement;

	clearItem.addEventListener("click", (): void => {
		fullList.clearList();
		template.clear();
	});

	fullList.load();
	template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
