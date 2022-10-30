<script lang="ts">
	import { AppBar, Divider, menu, LightSwitch } from '@brainandbones/skeleton';
	import { SITE_NAME } from '$lib/utils/siteConfig';
	import { page } from '$app/stores';
	import QuickLinks from '../private/QuickLinks.svelte';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { loading } from '$lib/stores';
	import { invalidate } from '$app/navigation';

	const handleLogout: SubmitFunction = () => {
		loading.set(true);
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading.set(false);
		};
	};

</script>


<AppBar border="border-b border-b-surface-300 dark:border-b-surface-900">
	<!-- Branding -->
	<svelte:fragment slot="lead">
		<a href="/" class="text-sm sm:text-lg md:text-3xl font-bold uppercase mr-4" title="Return to Homepage">{SITE_NAME}</a>
	</svelte:fragment>
	<!-- Navigation -->
	<svelte:fragment slot="trail">
		{#if $page.data?.session?.user && !$page.url.pathname.startsWith('/dashboard')}
			<section class="hidden lg:flex space-x-4">
				<a class="btn" href="/pricing">Pricing</a>
			</section>
			<Divider vertical borderWidth="border-l-2" />
		{/if}
		<!-- Light Switch -->
		<section class="flex space-x-4 items-center">
			<LightSwitch origin="tr" />
			<Divider vertical borderWidth="border-l-2" />
			{#if $page.data.session?.user && $page.url.pathname.startsWith('/dashboard')}

					<button class="btn-icon btn-filled-primary">
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
								<path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
							</svg>	
						</span>
					</button>
					{#if $page.data.session}
						<form action="/logout" method="post" use:enhance={handleLogout}>
							<button class="btn btn-filled-primary" disabled={$loading} type="submit">Sign out</button>
						</form>
					{/if}
			{:else}
				<a class="btn btn-filled-primary btn-sm" href="/dashboard">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
					</svg>
					<span class="hidden sm:block">Dashboard</span>
				</a>
			{/if}
		</section>
	</svelte:fragment>
</AppBar>
{#if $page.data.session?.user && $page.url.pathname.startsWith('/dashboard')}
	<QuickLinks />
{/if}