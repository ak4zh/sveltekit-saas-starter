<script>
    import { PRICING_DESCRIPTION, PRICING_TAGLINE } from "$lib/utils/siteConfig";
    import PricingCard from "./PricingCard.svelte";
</script>

<section>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold">{PRICING_TAGLINE}</h2>
            <p class="mb-5 font-light text-surface-500 sm:text-xl dark:text-surface-400">{PRICING_DESCRIPTION}</p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <!-- Pricing Card -->
            <PricingCard />
            <PricingCard recommended={true}/>
            <PricingCard />
        </div>
    </div>
</section>