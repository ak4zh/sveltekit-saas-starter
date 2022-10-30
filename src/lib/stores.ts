import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export let loading: Writable<boolean> = writable(false)
export let priceStore = writable({});
