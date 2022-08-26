<script lang="ts">
    import { Button } from '@brainandbones/skeleton';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { writable } from 'svelte/store';
	let drawer = writable(false)
</script>


<main class="flex flex-row">
	<!-- Drawer -->
    <Sidebar bind:drawer={$drawer}/>
	<!-- Page Content -->
	<div id="main" class="w-screen h-screen overflow-y-auto">
		<header class="lg:hidden flex p-8 space-x-4">
			<!-- Hamburger Menu -->
			<Button variant="minimal" on:click={() => drawer.set(true)}>
				<svelte:fragment slot="lead">
				</svelte:fragment>
				<span class="text-surface-500 font-bold">Menu</span>
			</Button>
		</header>

		<!-- Page Slot -->
		<div class="container mx-auto p-8">
			<slot />
		</div>
	</div>
</main>
