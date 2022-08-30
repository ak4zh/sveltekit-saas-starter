<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_LOGIN_REDIRECT_PATH } from '$env/static/public';
	import { supabase } from '$lib/db';
	import { setServerSession } from '$lib/session';
	import { SITE_DESCRIPTION, SITE_NAME, SITE_TAG_LINE } from '$lib/utils/siteConfig';
	import { Button } from '@brainandbones/skeleton';
	import { onMount } from 'svelte';

	onMount(async () => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			await setServerSession(session);
			if (event === "SIGNED_IN") {
				goto(PUBLIC_LOGIN_REDIRECT_PATH);
			}
		})
	})
</script>

<div class="space-y-8 lg:text-left">
	<!-- Hero -->
	<header>
		<div class="max-w-[90%] lg:max-w-[80%] mx-auto space-y-6 py-10 md:py-20">
			<h1 class="text-3xl md:text-5xl lg:text-6xl">
				<span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">{SITE_NAME}</span>
			</h1>
			<h2 class="text-4xl md:text-6xl lg:text-7xl">{SITE_TAG_LINE}</h2>
			<p class="text-xl">{SITE_DESCRIPTION}</p>
			<nav class="flex space-x-4">
				<Button variant="filled-primary" href="/dashboard">Get Started</Button>
			</nav>
		</div>
	</header>
</div>
