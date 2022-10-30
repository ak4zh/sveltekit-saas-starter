<script lang="ts">
	import type { Stripe } from "stripe";

    export let recommended = false
    export const pricingPlan = {
        name: 'Starter',
        description: 'Best option for personal use & for your next project.',
        currency: '$',
        amount: 25,
        interval: 'month',
        path: "#",
        features: [
            'Individual configuration',
            'No setup, or hidden fees',
            'Team size: 10 developers',
            'Premium support: 24 months',
            'Free updates: 24 months'
        ]
    }
    export let price: Stripe.Price
    const currencies = {
        'usd': '$',
        'inr': '₹'
    }
</script>

<div class="card {recommended ? 'border-2 border-primary-600' : ''} flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow xl:p-8 bg-surface-50 dark:bg-surface-800">
    <h3 class="mb-4 text-2xl font-semibold">{price.product.name}</h3>
    <p class="font-light text-surface-500 sm:text-lg dark:text-surface-400">{price?.product.description}</p>
    <div class="flex justify-center items-baseline my-8">
        <span class="mr-2 text-5xl font-extrabold">{currencies[price.currency]}{price.unit_amount/100}</span>
        <span class="text-surface-500 dark:text-surface-400" dark:text-surface-400>/{price.recurring.interval}</span>
    </div>

    <ul class="mb-8 space-y-4 text-left">
        {#each Object.values(price.product.metadata) as feature}
            <li class="flex gap-2 justify-start items-center">
                <svg class="flex-shrink-0 w-5 h-5 text-accent-500 dark:text-accent-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span>{feature}</span>    
            </li>
        {/each}
    </ul>
    <form method="POST" action="/payment/stripe">
        <input name="priceId" value={price.id} type="text" hidden/>
        <button type="submit" class="btn btn-filled-primary">Skeleton</button>
    </form>
</div>
