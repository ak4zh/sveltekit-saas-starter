<script lang="ts">
    import { SITE_DESCRIPTION, SITE_NAME, SITE_TAG_LINE } from '$lib/utils/siteConfig';
</script>

<div class="space-y-8 lg:text-left card">
	<!-- Hero -->
	<header>
		<div class="max-w-[90%] lg:max-w-[80%] mx-auto space-y-6 py-10 md:py-20">
			<h1 class="text-3xl md:text-5xl lg:text-6xl">
				<span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">{SITE_NAME}</span>
			</h1>
			<h2 class="text-4xl md:text-6xl lg:text-7xl">{SITE_TAG_LINE}</h2>
			<p class="text-xl">{SITE_DESCRIPTION}</p>
			<nav class="flex space-x-4">
				<a class="btn btn-lg btn-filled-primary" href="/dashboard">
					Get Started
				</a>
			</nav>
		</div>
	</header>
</div>
