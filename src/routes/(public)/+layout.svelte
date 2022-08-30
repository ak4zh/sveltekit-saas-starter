<script lang="ts">
    import { navigating } from '$app/stores';
    import NavBar from '$lib/components/NavBar.svelte';
    import { key as loaderKey } from '$lib/utils/loader';
    import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

    const loading: Writable<Boolean> = getContext(loaderKey)
    
    $: loading.set($navigating ? true : false)
</script>

<div class="max-w-7xl mx-auto">
    <NavBar />
    <slot />
</div>
