<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import { Drawer, Divider, LightSwitch, Button } from '@brainandbones/skeleton';
	import { SITE_NAME } from '$lib/utils/siteConfig';

	const visible: Writable<boolean> = writable(false);
    export let drawer: boolean = false
    $: if (drawer) {visible.set(drawer)}
    $: drawer = $visible
</script>

<!-- Drawer -->
<Drawer {visible} fixed="left">
    <!-- Header -->
    <svelte:fragment slot="header">
        <div class="flex justify-between items-center p-4">
            <a href="/" class="text-[26px] font-bold uppercase">{SITE_NAME}</a>
            <div class="flex justify-between items-center space-x-4">
                <!-- Light Switch -->
                <LightSwitch origin="tr" />
            </div>
        </div>
        <Divider />
    </svelte:fragment>

    <!-- Main -->
    <svelte:fragment slot="main">
        <div class="space-y-6 mb-10">

        </div>
    </svelte:fragment>

    <!-- Footer -->
    <svelte:fragment slot="footer">
        <Divider class="opacity-60" />
        <div class="text-xs opacity-50 p-4 flex justify-between">

        </div>
    </svelte:fragment>
</Drawer>

