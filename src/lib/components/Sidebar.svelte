<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import { Drawer, Divider, LightSwitch, Button } from '@brainandbones/skeleton';
	import { SITE_NAME } from '$lib/utils/siteConfig';
    import { supabase } from '$lib/db';
    import { setServerSession } from '$lib/session';
    import { goto } from '$app/navigation';
    import { key as loaderKey } from '$lib/utils/loader';
    import { getContext } from 'svelte';
    import type { User } from '@supabase/supabase-js'

    const loading: Writable<Boolean> = getContext(loaderKey)
	const visible: Writable<boolean> = writable(false);
    export let drawer: boolean = false
    export let user: User
    $: if (drawer) {visible.set(drawer)}
    $: drawer = $visible

    async function logOut() {
        loading.set(true)
        await supabase.auth.signOut();
        await setServerSession(null);
        goto('/login')
    }
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
            {user.email}
            <Button variant="ring-accent" on:click={() => logOut()}>Log out</Button>
        </div>
    </svelte:fragment>
</Drawer>

