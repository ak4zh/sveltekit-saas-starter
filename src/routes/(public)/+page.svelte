<script lang="ts">
    import { SITE_DESCRIPTION, SITE_NAME, SITE_TAG_LINE } from '$lib/utils/siteConfig';
	import { Card, LogoCloud, Divider, Logo, Button, TabGroup, Tab } from '@brainandbones/skeleton';
    import { writable } from 'svelte/store';
    let storeFramework = writable('')
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
