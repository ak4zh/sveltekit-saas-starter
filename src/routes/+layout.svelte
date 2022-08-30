<script lang="ts">
	import '../theme.postcss';	
	import '../app.postcss';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { key as loaderKey, loader } from '$lib/utils/loader';
	import { navigating } from '$app/stores';

	let loading = writable(false)
    $: loading.set($navigating ? true : false)
	setContext(loaderKey, loading);
</script>

<div class="bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50 min-h-screen min-w-screen" use:loader={loading}>
	<slot />
</div>	
