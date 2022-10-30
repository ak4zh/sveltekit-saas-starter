<script type="ts">
    import type { PageData } from './$types'
    import Pricing from "$lib/components/Pricing.svelte";
    import { groupProductsByInterval } from "$lib/utils/groupBy";
    import { env } from '$env/dynamic/public'
    import { PRICING_DESCRIPTION, PRICING_TAGLINE } from "$lib/utils/siteConfig";

    export let data: PageData
    const products = env.PUBLIC_STRIPE_PRICING_TABLE_ID ? [] : groupProductsByInterval(data.prices)
</script>

<svelte:head>
    <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
</svelte:head>

<section>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold">{PRICING_TAGLINE}</h2>
            <p class="mb-5 font-light text-surface-500 sm:text-xl dark:text-surface-400">{PRICING_DESCRIPTION}</p>
        </div>
        {#if env.PUBLIC_STRIPE_PRICING_TABLE_ID}
            <stripe-pricing-table pricing-table-id="{env.PUBLIC_STRIPE_PRICING_TABLE_ID}"
                    publishable-key="{env.PUBLIC_STRIPE_PUBLIC_KEY}">
            </stripe-pricing-table>
        {:else}
            <Pricing {products} />
        {/if}
    </div>
</section>


