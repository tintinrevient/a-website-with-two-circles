import { writable } from 'svelte/store';
import { base } from '$app/paths';

function createTechnologiesStore() {
	const { subscribe, set } = writable({});

	async function load() {
		const response = await fetch(`${base}/data/technologies.json`);
		const data = await response.json();

		set(data);
	}

	return {
		subscribe,
		load: load
	};
}

export const technologiesStore = createTechnologiesStore();