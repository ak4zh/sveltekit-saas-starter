<script lang="ts">
    import { SITE_NAME, SITE_PRIMARY_NAV } from '$lib/utils/siteConfig';
    import { LightSwitch, Button } from '@brainandbones/skeleton';
</script>

<section class="sticky top-0 z-40 w-full px-8 py-4 backdrop-blur border-b border-surface-50/[0.06] md:block">
    <div class="flex justify-between items-center max-w-content mx-auto">
        <a href="/" class="text-3xl">{SITE_NAME}</a>
        <nav class="flex justify-between items-center space-x-8">
            <div class="hidden md:flex justify-between items-center space-x-8">
                {#each Object.entries(SITE_PRIMARY_NAV) as [linkName, linkData]}
                    <a sveltekit:prefetch href="{linkData.path}">
                        {linkName}
                    </a>
                {/each}
            </div>
            <LightSwitch />
        </nav>
    </div>
    
</section>

<section class="fixed bottom-0 z-40 w-full bg-surface-100 dark:bg-surface-900 border-t border-surface-400 md:hidden">
    <nav class="flex justify-center my-4 items-center gap-4">
        {#each Object.entries(SITE_PRIMARY_NAV) as [linkName, linkData]}
            <Button variant="ring-secondary" href="{linkData.path}">{linkName}</Button>
        {/each}
    </nav>
</section>
