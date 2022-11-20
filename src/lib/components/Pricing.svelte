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
</script>


<div class="flex flex-col gap-4">
    <TabGroup selected={storeTab} justify="justify-start md:justify-center" highlight="border-accent-500" color="text-accent-500">
        {#each Object.entries(products) as [interval, prices]}
            <Tab value="{interval}">
                <span>{intervals[interval]}</span>
            </Tab>
        {/each}
    </TabGroup>
    <div class="flex justify-center gap-4">
        {#each Object.entries(products) as [interval, prices]}
            {#if $storeTab === interval}
                {#each prices.sort((a, b) => a.unit_amount - b.unit_amount) as price}
                    <PricingCard {price}/>
                {/each}
            {/if}
        {/each}
    </div>
</div>

