<script lang="ts">
    import PricingCard from "./PricingCard.svelte";
    import { writable, type Writable } from "svelte/store";
    import { TabGroup, Tab } from "@brainandbones/skeleton";
    export let products = {}
    let storeTab: Writable<string> = writable(Object.keys(products)[0] || 'month');
    
    const intervals = {
        month: 'Monthly',
        year: 'Yearly'
    }
    console.log(products)
</script>

<TabGroup selected={storeTab} justify="justify-start md:justify-center" highlight="border-accent-500" color="text-accent-500">
    {#each Object.entries(products) as [interval, prices]}
        <Tab value="{interval}">
            <span>{intervals[interval]}</span>
        </Tab>
    {/each}
</TabGroup>

{#each Object.entries(products) as [interval, prices]}
    {#if $storeTab === interval}
        <div class="mt-4 space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {#each prices as price}
                <PricingCard {price}/>
            {/each}
        </div>
    {/if}
{/each}