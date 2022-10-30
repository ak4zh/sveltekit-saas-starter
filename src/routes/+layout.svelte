<script lang="ts">
	import '@brainandbones/skeleton/themes/theme-skeleton.css';
	import '@brainandbones/skeleton/styles/all.css';
	import '../app.postcss';
	import { loader } from '$lib/utils/loader';
	import { navigating } from '$app/stores';
	import NavBar from '$lib/components/common/NavBar.svelte';
	import { AppShell } from '@brainandbones/skeleton';

	// auth-helpers import
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loading } from '$lib/stores';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	$: loading.set($navigating ? true : false);
</script>

<AppShell>
    <!-- Header -->
    <svelte:fragment slot="pageHeader"><NavBar /></svelte:fragment>
    <!-- Page Content Slot -->
    <div class="max-w-7xl mx-auto" use:loader={loading}>
		<slot />
	</div>
</AppShell>