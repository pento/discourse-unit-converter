import { withPluginApi } from "discourse/lib/plugin-api";
import UnitConverterPreference from "../components/unit-converter-preference";
import { MATCHERS, SETTING_NAME } from "../lib/constants";

function initializeConverter(api) {
	const preference = localStorage.getItem(SETTING_NAME);

	api.renderInOutlet("user-preferences-interface", UnitConverterPreference);

	api.decorateCookedElement((element) => {
		if (preference === "none") {
			return;
		}

		const nodeReplacements = [];

		const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
		while (treeWalker.nextNode()) {
			const node = treeWalker.currentNode;
			const textReplacements = [];

			MATCHERS.forEach((matcher) => {
				if (preference === 'imperial' && matcher.unitType === 'metric') {
					return;
				}
				if (preference === 'metric' && matcher.unitType === 'imperial') {
					return;
				}

				const pattern = new RegExp("(?<value>\\d+/\\d+|(?:\\d*\\.)?\\d+)\\s*" + matcher.pattern + "\\b", "ig");

				let match;
				while((match = pattern.exec(node.nodeValue)) !== null) {
					const rawValue = match.groups.value;

					let value;
					if(rawValue.includes('/')) {
						const [numerator, denominator] = rawValue.split('/');
						value = parseFloat(numerator) / parseFloat(denominator);
					} else {
						value = parseFloat(rawValue);
					}

					const converted = matcher.convert(value);

					textReplacements.push({
						match: match[0],
						replacement: `<span class="unit-converter" title="${converted}">${match[0]}</span>`
					});
				}
			});

			if (textReplacements.length > 0) {
				const newText = textReplacements.reduce(
					(text, replacement) => text.replace(replacement.match, replacement.replacement),
					node.nodeValue
				);

				const fragment = document.createRange().createContextualFragment(newText);
				nodeReplacements.push({
					node,
					fragment
				});
			}
		}

		// Do our replacements after we've walked the tree, so we don't mess up the treeWalker.
		nodeReplacements.forEach(({ node, fragment }) => {
			node.replaceWith(fragment);
		});
	});
}

export default {
	initialize() {
		withPluginApi("1.14.0", initializeConverter);
	}
};
